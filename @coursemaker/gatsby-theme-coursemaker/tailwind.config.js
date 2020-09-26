module.exports = {
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
					marginLeft: 'auto',
					marginRight: 'auto',
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1180px',
          },
        }
      })
    }
	],
	theme: {
		extend: {
			colors: {
				'pink': '#F0EBE8',
				'orange': '#f39c12'
			}
		},
	},
	variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
