; AutoTest Studio — NSIS uninstall hooks for electron-builder
; Wire via nsis.include in electron-builder.config.cjs
;
; On uninstall, ask whether to keep historical app data under %APPDATA%.
; User-chosen project directories outside AppData are never deleted here.

!macro customUnInstall
  ; Skip cleanup when this uninstall runs as part of an in-place update.
  ${ifNot} ${isUpdated}
    StrCpy $R9 "0"

    ClearErrors
    ${GetParameters} $R0
    ${GetOptions} $R0 "--delete-app-data" $R1
    ${IfNot} ${Errors}
      StrCpy $R9 "1"
    ${ElseIfNot} ${Silent}
      MessageBox MB_YESNO|MB_ICONQUESTION \
        "是否保留历史数据？$\r$\n$\r$\n历史数据包括：项目列表、偏好设置，以及默认项目目录下的用例与报告。$\r$\n$\r$\n• 选「是」：保留，下次安装可继续使用$\r$\n• 选「否」：删除工作台应用数据$\r$\n$\r$\n说明：您自行选择目录创建的测试项目不会随卸载删除。" \
        IDYES keep_history_data
      StrCpy $R9 "1"
      keep_history_data:
    ${EndIf}

    ${If} $R9 == "1"
      ${if} $installMode == "all"
        SetShellVarContext current
      ${endif}
      ; Same cleanup targets as electron-builder stock deleteAppDataOnUninstall.
      RMDir /r "$APPDATA\${APP_FILENAME}"
      !ifdef APP_PRODUCT_FILENAME
        RMDir /r "$APPDATA\${APP_PRODUCT_FILENAME}"
      !endif
      !ifdef APP_PACKAGE_NAME
        RMDir /r "$APPDATA\${APP_PACKAGE_NAME}"
      !endif
      ${if} $installMode == "all"
        SetShellVarContext all
      ${endif}
    ${EndIf}
  ${endif}
!macroend
