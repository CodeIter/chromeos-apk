# `manifest.json` configuration

## `arc_metadata`

Raw list of possible values for `arc_metadata`:

```json
"arc_metadata": {
  "allowEmptyActivityStack": false,
  "apkList": [
    "custom-android-release-1400197.apk"
  ],
  "canRotate": false,
  "disableAutoBackButton": false,
  "enableAdb": false,
  "enableArcStrace": false,
  "enableExternalDirectory": false,
  "enableGlErrorCheck": false,
  "formFactor": "phone",
  "fpsLimit": 60,
  "isSlowDebugRun": false,
  "jdbPort": 0,
  "logLoadProgress": false,
  "minimumLaunchDelay": 0,
  "name": "",
  "ndkAbi": "",
  "orientation": "portrait",
  "packageName": "org.chromium.arc",
  "resize": "disabled",
  "shell": [],
  "stderrLog": "S",
  "useGoogleContactsSyncAdapter": false,
  "usePlayServices": [
   "gcm"
  ],
  "sleepOnBlur": true
}
```

## `file_handlers`

See [https://developer.chrome.com/apps/manifest/file_handlers .](https://developer.chrome.com/apps/manifest/file_handlers)
This is useful for Chrome OS users. You can experiment opening files with certain Android apps by setting their file handlers.
Add to `manifest.json` in your app:

```json
 "file_handlers": {
      "any": {
         "title": "Open with SOME_APP",
         "types": [ "*/*" ]
      }
  },
```

This way your file manager will get this option:
![image](https://googledrive.com/host/0BzQL8Rq6oc8_bVpfc0hjM3BsVk0)