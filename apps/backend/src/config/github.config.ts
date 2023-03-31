import { registerAs } from '@nestjs/config';

export default registerAs('github', () => {
  return { pat: process.env.GITHUB_PAT };
});
