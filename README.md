# Lambstatus theme updater
Update theme for status pages created with [lamb-status](https://github.com/ks888/LambStatus)

Lambstatus is great for creating status pages, but there's one possible area where it falls short in performance. And that is style of the generated status page.

Use this project to update the stylesheet (css) of your status pages. Here's a demo below.

<!-- ![Default styles](./readme/default.png) -->
#### Before:
<img src="./readme/default.png" width="400">

#### After:
<img src="./readme/updated.png" width="400">



#### To update , follow the steps below:

1. `git clone https://github.com/Nishkalkashyap/lambstatus-theme-updater`
2. `cd lambstatus-theme-updater`
3. `npm install`
4. Add a `.env` file at the root of the project like so.
   ```
    access_key=fnsbdfsbdfksdkfsfblablabla....
    secret_key=fkdsfnsdnfblablabla...
    bucket=fkdsfnsdnfblablabla...
   ```

5. `npm run download`
6. `npm run prepare`
7. `npm run watch`
8. open web browser at `localhost:8080`
9. Add your styles in the file `/css/index.scss`
10. Finally, to upload your styles, run `npm run upload`
11. Dance!!! 💃 Your page styles have been updated.

![](https://media.giphy.com/media/LLHkw7UnvY3Kw/giphy.gif)