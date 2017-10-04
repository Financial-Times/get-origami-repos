
# Get Origami Repos

Get a JSON array of all Origami GitHub repositories.


## Usage

### Requirements

Running Get Origami Repos requires [Node.js] 8+ and [npm] 5+. Install globally with:

```sh
npm install -g @financial-times/get-origami-repos
```

### Running

Run the command with:

```sh
GITHUB_AUTH_TOKEN=XXXXXX get-origami-repos
```

To save to a local JSON file:

```sh
GITHUB_AUTH_TOKEN=XXXXXX get-origami-repos > origami-repos.json
```


## Contact

If you have any questions or comments about this module, or need help using it, please either [raise an issue][issues], visit [#ft-origami] or email [Origami Support].


## Licence

This software is published by the Financial Times under the [MIT licence].



[#ft-origami]: https://financialtimes.slack.com/messages/ft-origami/
[issues]: https://github.com/Financial-Times/get-origami-repos/issues
[mit license]: http://opensource.org/licenses/MIT
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[origami support]: mailto:origami-support@ft.com
