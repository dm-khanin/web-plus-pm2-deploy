require('dotenv').config({
  path: '.env.deploy',
});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REPO, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-api',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
