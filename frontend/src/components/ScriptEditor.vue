<template>
  <div class="script-editor-shell">
    <div class="script-editor-toolbar">
      <el-button :icon="MagicStick" size="small" :disabled="readonly" title="格式化脚本" @click="formatScript">格式化</el-button>
    </div>
    <div ref="host" class="script-editor-host" :class="{ 'is-readonly': readonly }" />
    <div v-if="displayErrors.length" class="script-editor-errors" role="alert">
      <el-text v-for="(error, index) in displayErrors" :key="`${index}-${error}`" type="danger">{{ error }}</el-text>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { MagicStick } from '@element-plus/icons-vue';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { bracketMatching, indentRange } from '@codemirror/language';
import { forceLinting, lintGutter, linter, lintKeymap } from '@codemirror/lint';
import { searchKeymap } from '@codemirror/search';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { parse } from 'acorn';

const props = defineProps({
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  errors: { type: Array, default: () => [] }
});
const emit = defineEmits(['update:modelValue']);
const host = ref();
const viewRef = shallowRef();
const readOnlyCompartment = new Compartment();
const syntaxErrors = ref([]);
let syncing = false;

const displayErrors = computed(() => [
  ...syntaxErrors.value,
  ...(props.errors || []).map((error) => typeof error === 'string' ? error : error.message || String(error))
]);

function readOnlyExtension() {
  return EditorState.readOnly.of(Boolean(props.readonly));
}

function updateDocument(value) {
  const view = viewRef.value;
  if (!view || value === view.state.doc.toString()) return;
  syncing = true;
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value }
  });
  syncing = false;
}

function syntaxDiagnostics(view) {
  const source = view.state.doc.toString();
  try {
    parse(source, { ecmaVersion: 'latest', sourceType: 'module', allowHashBang: true });
    syntaxErrors.value = [];
    return [];
  } catch (error) {
    const from = Math.max(0, Math.min(Number(error.pos || 0), view.state.doc.length));
    const message = `语法错误：${error.message}`;
    syntaxErrors.value = [message];
    return [{ from, to: Math.min(from + 1, view.state.doc.length), severity: 'error', message }];
  }
}

function externalDiagnostics(view) {
  return (props.errors || []).flatMap((error) => {
    const message = typeof error === 'string' ? error : error?.message || String(error);
    const match = message.match(/\((\d+):(\d+)\)/);
    const lineNumber = Number(error?.line || match?.[1] || 0);
    const column = Number(error?.column ?? match?.[2] ?? 0);
    if (!lineNumber || lineNumber > view.state.doc.lines) return [];
    const line = view.state.doc.line(lineNumber);
    const from = Math.min(line.to, line.from + Math.max(0, column));
    return [{ from, to: Math.min(from + 1, view.state.doc.length), severity: 'error', message }];
  });
}

function editorDiagnostics(view) {
  return [...syntaxDiagnostics(view), ...externalDiagnostics(view)];
}

function formatScript() {
  const view = viewRef.value;
  if (!view || props.readonly) return;
  const changes = indentRange(view.state, 0, view.state.doc.length);
  if (!changes.empty) view.dispatch({ changes });
  view.focus();
}

onMounted(() => {
  viewRef.value = new EditorView({
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        javascript(),
        lineNumbers(),
        bracketMatching(),
        history(),
        lintGutter(),
        linter(editorDiagnostics, { delay: 250 }),
        keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap, ...lintKeymap]),
        readOnlyCompartment.of(readOnlyExtension()),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !syncing) emit('update:modelValue', update.state.doc.toString());
        })
      ]
    }),
    parent: host.value
  });
});

watch(() => props.modelValue, updateDocument);
watch(() => props.readonly, (value) => {
  const view = viewRef.value;
  if (view) view.dispatch({ effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(Boolean(value))) });
});
watch(() => props.errors, () => { if (viewRef.value) forceLinting(viewRef.value); }, { deep: true });

onBeforeUnmount(() => {
  const view = viewRef.value;
  if (view) view.destroy();
  viewRef.value = undefined;
});

defineExpose({
  formatScript,
  focus: () => viewRef.value?.focus(),
  get view() { return viewRef.value; }
});
</script>

<style scoped>
.script-editor-host {
  min-height: 320px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;
  background: var(--el-fill-color-blank);
}
.script-editor-toolbar { display: flex; justify-content: flex-end; margin-bottom: 6px; }
.script-editor-host :deep(.cm-editor) { min-height: 320px; font-size: 13px; }
.script-editor-host :deep(.cm-scroller) { min-height: 320px; font-family: Consolas, "Courier New", monospace; }
.script-editor-host.is-readonly { background: var(--el-fill-color-light); }
.script-editor-errors { display: grid; gap: 3px; margin-top: 6px; }
</style>
