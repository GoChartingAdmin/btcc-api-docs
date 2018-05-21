module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'BTCC API 文档',
      description: 'BTCC websocket api 文档'
    },
    '/en/': {
      lang: 'en-US',
      title: 'BTCC API DOCS',
      description: 'BTCC websocket api docs'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/icons/favicon.ico`
      }
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/icons/site.webmanifest'
      }
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#3eaf7c'
      }
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black'
      }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: `/icons/apple-touch-icon.png`
      }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/mstile-150x150.png'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      }
    ]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'zcong1993/btcc-api-docs',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: ['/', '/sign', '/engine', '/balance'],
        nav: [
          {
            text: '代码示例',
            items: [
              {
                text: 'Javascript',
                link:
                  'https://github.com/zcong1993/btcc-api-docs/tree/master/examples/js'
              },
              {
                text: 'NodeJS',
                link:
                  'https://github.com/zcong1993/btcc-api-docs/tree/master/examples/nodejs'
              },
              {
                text: 'Python3',
                link:
                  'https://github.com/zcong1993/btcc-api-docs/tree/master/examples/python3'
              }
            ]
          }
        ]
      },
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        sidebar: ['/en/', '/en/sign', '/en/engine', '/en/balance'],
        nav: [
          {
            text: 'Examples',
            items: [
              {
                text: 'Javascript',
                link:
                  'https://github.com/zcong1993/btcc-api-docs/tree/master/examples/js'
              },
              {
                text: 'NodeJS',
                link:
                  'https://github.com/zcong1993/btcc-api-docs/tree/master/examples/nodejs'
              },
              {
                text: 'Python3',
                link:
                  'https://github.com/zcong1993/btcc-api-docs/tree/master/examples/python3'
              }
            ]
          }
        ]
      }
    }
  }
}
