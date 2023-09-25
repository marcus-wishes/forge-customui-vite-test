# @forge Stuff

## Tunnelling Without Docker

https://community.developer.atlassian.com/t/quick-tip-tunneling-without-docker-useful-for-apple-silicon-m1/51789

`npm i -i @forge/sandbox-tunnel@latest`

run with:
`FORGE_DEV_TUNNEL=true forge tunnel`

Snapshots are not correctly working with NodeJS18 (the Docker image uses Node14, and Python2, I am not sure how relevant the Python part is).

## Dev

The example is using the deprecated react-scripts with webpack, which does not work for me. With Vite it works. You need to set Vite to use the port specified in the manifest.yaml _resources/tunnel/port_ entry.

### Vite + CSS

https://community.developer.atlassian.com/t/forge-tunneling-doest-include-the-css-file/68349

Vite inlines CSS during dev mode, but Atlassian disallowed inlined CSS style tag content by default using CSP. To enable them edit _permissions/content/styles_ and add '- unsafe-inline'.

This needs to be enabled again for `forge deploy`
