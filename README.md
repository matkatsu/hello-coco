# hello-coco

## Lambdaアップロード用zipファイル
```
$ zip -r lambda.zip index.js constants.js node_modules/
```

## SSML用オーディオファイル生成サンプル
```
$ ffmpeg -i before.mp3 -ac 2 -codec:a libmp3lame -b:a 48k -af volume=20dB -ar 16000 after.mp3
```
ボリュームは適宜調整
