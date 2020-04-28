const puppeteer=require('puppeteer');

let repoList=[
    // userName/repoName,
    // userName/repoName,
    // etc...
];

const github={
    login: //'your github username', //=> LESS YOU CAN FIGURE TO ACCESS YOUR LOCALLY CRED VIA git.config --get
    password: //'your github password' //=> LESS YOU CAN FIGURE TO ACCESS YOUR LOCALLY CRED VIA git.config --get
};


for(let i=0;i<=repoList.length;i++){
    (
        async()=>{

            // below are the variables when called initialize PUPPETEER and create the headless browser for the session
                const chrome=await puppeteer.launch();
                const page=await chrome.newPage();
            
            // below permits first access into your github account...
            await page.goto(`https://github.com/login`);
    
            await page.type('#login_field', github.login);
            await page.type('#password', github.password);
            await page.click('.btn')
    
    
    
            // Via the FOR loop this script will perform this action at the URL stated in the next line...you can hardcode as many repos
            // be sure to type them correctly because no there is no fail-safe is in place **you can blow your machine**
            await page.goto(`https://github.com/${repoList[i]}/settings/`);
            // next line targets the first delete button and assigns an ID
            await page.$$eval('.btn-danger', e=>e[e.length-2].id='deletebutton');
            // with newly assigned ID we can target an action towards it
            await page.click('#deletebutton');
            // the server then prompts a user to confirm there willingness to delete I automated by assigning an ID to inputfield then adding text like so
            await page.$$eval('.input-block', e=>e[e.length-1].id='typerepo');
            await page.type('#typerepo', `${repoList[i]}`);
            // Finally here is where the "confirming delete button" is clicked
            await page.$$eval('[data-disable-invalid]', e=>e[e.length-1].id='acceptdelete');
            await page.click('#acceptdelete');
            
            // ******* the below are two methods helpful with following whats happin' while runnning script
            // await page.pdf({path: 'page.pdf'});
            console.log(await page.content())
    
    
            await chrome.close();
        }
    )();    
};