# Setup

add to package.json (not yet published on npm)

```
"react-detect-offline": "git://github.com/TapTapQuote/react-detect-offline.git#master"
```

then npm/yarn install

# Documentation

## Hooks

```jsx
import { useConnection } from 'react-detect-offline'

const MyCoolComponent = () => {
  const { online } = useConnection()

  return (
    <div>
      {online && <p>Only shown when you're online</p>}
      {!online && <p>Only shown when you're offline</p>}
    </div>
  )
}

const App = () => {
  return (
    <ConnectionProvider>
      <MyCoolComponent />
    <ConnectionProvider />
  )
}
```

## Components

### Offline and Online components for React

Components that track [offline and online state](https://developer.mozilla.org/en-US/docs/Online_and_offline_events). Render certain content only when online (or only when offline).

```jsx
import { Offline, Online, ConnectionProvider } from 'react-detect-offline'

const App = () => (
  <ConnectionProvider>
    <Online>Only shown when you're online</Online>
    <Offline>Only shown offline (surprise!)</Offline>
  </ConnectionProvider>
)
```

### Props

`<Online/>`, `<Offline/>`, and `<Detector/>` accept the following props:

| Prop               | Type        | Description                       | Default                        |
| ------------------ | ----------- | --------------------------------- | ------------------------------ |
| `polling`          | Obj or Bool | Config for polling fallback [1]   | [see below]                    |
| `polling.enabled`  | Boolean     | Force polling on or off           | Depends on the browser [1]     |
| `polling.url`      | String      | URL to pool for connection status | `"https://ipv4.icanhazip.com"` |
| `polling.interval` | Number      | How often (in ms) to poll         | `5000`                         |
| `polling.timeout`  | Number      | How long (in ms) before timeout   | `5000`                         |
| `onChange`         | Function    | Called when connection changes    | none                           |
| `children` [2]     | Element(s)  | Children **not Detector**         | none                           |
| `render` [3]       | Func        | Render function **Detector only** | none                           |

[1] Polling is only used as a fallback for browsers that don't support the `"online"` event. Currently these are Chrome on Windows, Firefox on Windows, and Chrome on Linux.

[2] `<Online/>` and `<Offline/>` only. `<Detector/>` will not render `children`.

[3] `<Detector/>` only

### Browser Support

The [web spec](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) we rely on is supported by IE 9+, Chrome 14+, Firefox 41+, and Safari 5+ - that's [94% of worldwide (98% of US)](http://caniuse.com/#feat=online-status) browser traffic. A polling fallback is used for browsers that don't implement the spec in a useful way (see note [1] in the above Props section).

### Contributing

PRs are welcome!

- Test: `yarn test`
- Build: `yarn build`. Make sure you commit the build file (`dist/index.js`)
