import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
});
