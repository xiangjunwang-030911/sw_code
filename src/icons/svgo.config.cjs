module.exports = {
    plugins: [
        // {
        //     name: "removeAttrs",
        //     params: {
        //         attrs: ["fill", "fill-rule"],
        //     },
        // },
        {
            name: 'preset-default',
            params: {
              overrides: {
                removeFill: false,
                inlineStyles: { onlyMatchedOnce: false },
              },
            },
          },
          {
            name: 'convertColors',
            params: {
              currentColor: true,
            },
          },
    ],
};
