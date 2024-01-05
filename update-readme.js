const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://api.github.com/users/coppolaop/events/public';

axios.get(apiUrl)
    .then(response => {
        const pushEvent = response.data.find(event => event.type === 'PushEvent');

        if (!pushEvent) {
            console.log('Nenhum evento do tipo "PushEvent" encontrado.');
            process.exit(0);
        }

        const latestRepoName = pushEvent.repo.name.split('/').pop();
        const latestRepoUrl = "https://github.com/" + pushEvent.repo.name;

        const readmeContent = fs.readFileSync("README.md", 'utf-8');

        const updatedLine = `- 🔭 I’m currently working on [${latestRepoName}](${latestRepoUrl})`;

        const updatedReadmeContent = readmeContent.replace(/- 🔭 I’m currently working on .*/, updatedLine);


        fs.writeFileSync("README.md", updatedReadmeContent, 'utf-8');
    })
    .catch(error => {
        console.error('Erro ao obter dados da API:', error);
        process.exit(1);
    });
