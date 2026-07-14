# JMOM 鑷姩鍖栨祴璇曞钩鍙?

杩欐槸闈㈠悜娴嬭瘯浜哄憳鐨?JMOM B/S 鑷姩鍖栨祴璇曞钩鍙般€傚钩鍙版妸 Playwright 鑴氭湰鍖呰鎴愬彲绠＄悊鐨勬祴璇曞満鏅紝娴嬭瘯浜哄憳閫氳繃缃戦〉閫夋嫨鍦烘櫙銆佷笂浼犳牱鏈暟鎹€佹墽琛屽洖褰掑苟鏌ョ湅鎶ュ憡銆?

## 涓€鏈熻兘鍔?

- 鍦烘櫙搴擄細鐧诲綍銆佸鎴?渚涘簲鍟?鐗╂枡/搴撲綅銆侀噰璐?閿€鍞鍗曪紙瀵煎叆璺緞锛夈€丒xcel 瀵煎叆閰嶇疆锛屼互鍙?MES 宸ュ崟/绾夸綋/鏉＄爜杩囩珯銆?
- 鏍锋湰鏁版嵁锛欳SV/Excel 涓婁紶鏍￠獙锛涜鍒欏寲鏍蜂緥鐢熸垚锛涘彲閫?AI 鐢熸垚锛堝け璐ュ洖閫€瑙勫垯锛夈€?
- 鎵ц涓績锛歅laywright Runner锛沨eadless / headed / ui锛涘鐜鍒囨崲锛涙寜 scriptEntry 绮剧‘鎵ц銆?
- 鎶ュ憡涓績锛氭墽琛岀姸鎬併€丠TML 鎶ュ憡銆佽繃绋嬫埅鍥句笌褰曞儚鍥炴斁銆?
- 骞冲彴鎵╁睍锛氬満鏅?CRUD / 鍙戝竷涓嬫灦銆佷緷璧栨鏌ャ€佸綍鍒惰崏绋垮叆搴撱€?
- 鏉冮檺锛氭祴璇曚汉鍛樼淮鎶ゆ暟鎹苟鎵ц锛涚淮鎶ゅ憳/绠＄悊鍛樼鐞嗗満鏅笌鐜銆?

瀹屽杽璺嚎鍥撅細`docs/superpowers/specs/2026-07-09-瀹屽杽璺嚎鍥?design.md`

## 鍚姩骞冲彴

```powershell
npm install
npm start
```

榛樿璁块棶鍦板潃锛?

- `http://localhost:3050`

榛樿骞冲彴璐﹀彿锛?

| 瑙掕壊 | 璐﹀彿 | 瀵嗙爜 |
|------|------|------|
| 娴嬭瘯浜哄憳 | tester | Tester123! |
| 鍦烘櫙缁存姢鍛?| maintainer | Maintainer123! |
| 绠＄悊鍛?| admin | Admin123! |

### Docker Compose 閮ㄧ讲

```bash
cd docker
docker-compose up -d --build
```

鑻?Docker 瀹夎鎻愪緵鐨勬槸 CLI 鎻掍欢锛屼篃鍙娇鐢?`docker compose up -d --build`銆傛湇鍔℃槧灏勫埌瀹夸富鏈?`3050` 绔彛锛孲QLite銆佷笂浼犳枃浠跺拰鎵ц鎶ュ憡鎸佷箙鍖栧湪瀹夸富鏈虹殑 `platform-data/`銆傚鍣ㄥ熀浜?Node 22 Alpine锛屼娇鐢ㄧ郴缁?Chromium锛屽苟閫氳繃 Xvfb 鏀寔鏈夊ご妯″紡鍜?UI 妯″紡鎵ц銆?

## JMOM 娴嬭瘯鐜

榛樿琚祴鐜鏉ヨ嚜 `Agents.md`锛?

- `JMOM_BASE_URL=http://172.16.100.11:46069`
- `JMOM_USERNAME=byc`
- `JMOM_PASSWORD=Abcd1234`

濡傞渶瑕嗙洊锛?

```powershell
$env:JMOM_BASE_URL='http://172.16.100.11:46069'
$env:JMOM_USERNAME='byc'
$env:JMOM_PASSWORD='Abcd1234'
npm start
```

## 鍏嶅畨瑁呮湰鍦板綍鍒?
鏅€氭祴璇曞悓浜嬫帹鑽愪娇鐢ㄧ豢鑹插厤瀹夎褰曞埗鍣紝鏃犻渶瀹夎 Node.js銆乶pm銆丳laywright 鎴?.NET Runtime锛?
1. 鍦ㄥ満鏅鎯呯殑鈥滆剼鏈笌褰曞埗鈥濋〉绛剧偣鍑烩€滃紑濮嬪綍鍒垛€濄€?2. 涓嬭浇骞惰В鍘?`JMOM鏈湴褰曞埗鍣?win-x64.zip`銆?3. 鍙屽嚮 `JMOM褰曞埗鍣?exe`锛岃緭鍏ュ钩鍙版樉绀虹殑 8 浣嶅綍鍒剁爜銆?4. 鍦?Playwright Inspector 涓畬鎴愭搷浣滃苟鍏抽棴绐楀彛銆?5. 褰曞埗鍣ㄤ細鑷姩涓婁紶鑴氭湰骞剁粦瀹氬満鏅€?
褰曞埗鐮佹湁鏁堟湡涓?30 鍒嗛挓涓斿彧鑳戒娇鐢ㄤ竴娆°€傝缁嗚鏄庤锛歚docs/鍏嶅畨瑁呭綍鍒跺櫒浣跨敤璇存槑.md`銆?
寮€鍙戜汉鍛樹粛鍙娇鐢ㄥ吋瀹瑰懡浠わ細

```powershell
npm run record:local -- --id REC-xxx --token TOKEN --url "http://172.16.100.11:46069/#/login" --platform "http://localhost:3050"
```

## 寮€鍙戜笌楠岃瘉

```powershell
npm test
npm run test:e2e
```

骞冲彴鏁版嵁榛樿鍐欏叆锛?

- `platform-data/platform.sqlite`
- `platform-data/uploads/`
- `platform-data/reports/`

Playwright 鍘熷缁撴灉浠嶄細鍐欏叆锛?

- `test-results/runs/<杩愯鏃堕棿>/`

## 鏍锋湰鏁版嵁璇存槑

缃戦〉涓繘鍏ュ満鏅鎯呭悗锛岀偣鍑烩€滀笅杞紺SV妯℃澘鈥濓紝濉啓鍚庝笂浼犮€傚钩鍙颁細鏍￠獙蹇呭～鍒楋紝鏍￠獙閫氳繃鍚庢墠鑳藉垱寤烘墽琛屼换鍔°€?

鏀寔鏍煎紡锛?

- `.csv`
- `.xlsx`

## Runner 妯″紡

骞冲彴榛樿浣跨敤鐪熷疄 Playwright Runner銆傚紑鍙戞祴璇曟椂鍙娇鐢?mock 妯″紡蹇€熼獙璇佸钩鍙版祦绋嬶細

```powershell
$env:JMOM_RUN_MODE='mock'
npm start
```

## 浣跨敤鏂囨。

- 娴嬭瘯浜哄憳鎿嶄綔锛歚docs/娴嬭瘯浜哄憳浣跨敤鎵嬪唽.md`
- 鍏嶅畨瑁呭綍鍒跺櫒锛歚docs/鍏嶅畨瑁呭綍鍒跺櫒浣跨敤璇存槑.md`
- 閮ㄧ讲涓庡畨鍏細`docs/閮ㄧ讲涓庡畨鍏ㄨ鏄?md`
- 浜у搧瀹屽杽璁捐锛歚docs/superpowers/specs/2026-07-11-鐢ㄦ埛浣撻獙涓庤繍钀ヨ兘鍔涘畬鍠?design.md`


在目标服务器上完成代码更新后，可直接进入仓库根目录使用一键脚本打包并运行：

```bash
sh docker/docker-deploy.sh
```

该脚本会修复平台数据目录权限、构建镜像、启动/更新容器并执行健康检查，也可以通过 Jenkins 的 Publish over SSH 在远端调用。