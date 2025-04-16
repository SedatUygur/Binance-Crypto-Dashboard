<!-- Improved compatibility of back to top link: See: https://github.com/SedatUygur/Binance-Crypto-Dashboard/pull/73 -->

<a id="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">Binance Crypto Dashboard</h3>

  <p align="center">
    Binance Crypto Dashboard is leveraging the Binance API to handle live ticker data and implementing a real-time cryptocurrency dashboard
    <br />
    <a href="https://github.com/SedatUygur/Binance-Crypto-Dashboard"><strong>Explore the docs</strong></a>
    <br />
    <br />
    <a href="https://github.com/SedatUygur/Binance-Crypto-Dashboard/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/SedatUygur/Binance-Crypto-Dashboard/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Binance Crypto Dashboard is leveraging the Binance API to handle live ticker data and implementing a real-time cryptocurrency dashboard. The dashboard provides a comprehensive overview of various cryptocurrencies, including their current prices, 24hr data including high, low, price change and percentage of price change. In addition users can display a real-time one-month (daily) historical chart. They can easily track their favorite cryptocurrencies and stay updated on the latest market trends.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![TypeScript][TypeScript-logo]][TypeScript]
[![JavaScript][JavaScript-logo]][JavaScript]
[![Nodejs][Nodejs-logo]][Nodejs]
[![Nextjs][Nextjs-logo]][Nextjs]
[![React][React-logo]][React]
[![Redux][Redux-logo]][Redux]
[![GraphQL][GraphQL-logo]][GraphQL]
[![Redis][Redis-logo]][Redis]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Install a package manager e.g npm, yarn, pnpm, bun etc.

### Installation

1. **Download or clone my repository:**
   ```sh
   git clone https://github.com/SedatUygur/Binance-Crypto-Dashboard.git
   cd Binance-Crypto-Dashboard
   ```
2. **Install the required dependencies for both client and services:**

   ```sh
   npm install
   ```

3. **Docker Compose:**
   If you prefer to use Docker, you can build and run the application using Docker Compose. Make sure Docker and Docker Compose are installed on your machine. Then run:
   ```bash
   docker-compose up --build
   ```
   This command will build the Docker images and start the containers.

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

<!-- FEATURES -->

## Features

- [x] Fetch and Display Trading Pairs
   - [x] Retrieve the names of 100 cryptocurrency trading pairs names from the Binance API.
   - [x] Display these trading pairs on the front end.
- [x] Back End WebSocket Management
   - [x] Develop a back end system to manage live WebSocket subscriptions for ticker data.
   - [x] Handle up to 100 concurrent WebSocket data streams without performance degradation.
- [x] Front end Subscription Functionality
   - [x] Allow users to subscribe to all tickers from the list of 100 trading pairs.
   - [ ] Update the prices of the selected trading pairs on the front end in real-time with minimal latency using WebSocket.
- [x] Detailed Pair Information
   - [x] Enable users to select a pair from the list to view detailed information
      - [x] 24-hour High
      - [x] 24-hour Low
      - [x] 24-hour Price Change
      - [x] 24-hour Percentage Change
- [ ] User-Specific Subscriptions (Authentication and Authorization Required)
   - [ ] Ensure that each user has a distinct subscription list that does not interfere with other users’ subscriptions.
- [x] Docker Support
   - [x] Containerize the application for easy deployment
   - [x] Ensure consistent environment across different setups
- [x] Scalability
   - [x] Handle multiple WebSocket connections efficiently.
   - [x] Ensures minimal latency and high throughput.

## Additional Features

- [x] Design an efficient and robust system on the backend to handle multiple WebSocket subscriptions simultaneously. 
   - [x] Add advanced features to minimize latency.
- [x] Ensure a responsive and intuitive user experience on the front end.
- [x] Add search and filter functionality on the backend to improve user navigation.
- [x] Display a real-time one-month (daily) historical chart for pairs using the Binance API.

See the [open issues](https://github.com/SedatUygur/Binance-Crypto-Dashboard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

You can follow the contribution guidelines(CONTRIBUTION.md) to contribute. We have issue templates for bug and feature requests.

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/SedatUygur/Binance-Crypto-Dashboard/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SedatUygur/Binance-Crypto-Dashboard" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Sedat Uygur - [@sedat-can-uygur](https://www.linkedin.com/in/sedat-can-uygur) - sedat.uygur@outlook.com

Project Link: [https://github.com/SedatUygur/Binance-Crypto-Dashboard](https://github.com/SedatUygur/Binance-Crypto-Dashboard)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Apollo Client](https://www.apollographql.com/docs/react)
- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Axios](https://axios-http.com/)
- [Chart.js](https://www.chartjs.org/)
- [Cypress](https://www.cypress.io/)
- [dotenv](https://dotenvx.com/)
- [ESLint](https://eslint.org/)
- [GraphQL](https://graphql.org/)
- [husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Next.js](https://nextjs.org/)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [React](https://react.dev/)
- [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Redis](https://redis.io/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [styled-components](https://styled-components.com/)
- [Tailwind](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [WebSocket](https://github.com/websockets/ws)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/SedatUygur/Binance-Crypto-Dashboard.svg?style=for-the-badge
[contributors-url]: https://github.com/SedatUygur/Binance-Crypto-Dashboard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SedatUygur/Binance-Crypto-Dashboard.svg?style=for-the-badge
[forks-url]: https://github.com/SedatUygur/Binance-Crypto-Dashboard/network/members
[stars-shield]: https://img.shields.io/github/stars/SedatUygur/Binance-Crypto-Dashboard.svg?style=for-the-badge
[stars-url]: https://github.com/SedatUygur/Binance-Crypto-Dashboard/stargazers
[issues-shield]: https://img.shields.io/github/issues/SedatUygur/Binance-Crypto-Dashboard.svg?style=for-the-badge
[issues-url]: https://github.com/SedatUygur/Binance-Crypto-Dashboard/issues
[license-shield]: https://img.shields.io/github/license/SedatUygur/Binance-Crypto-Dashboard.svg?style=for-the-badge
[license-url]: https://github.com/SedatUygur/Binance-Crypto-Dashboard/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sedat-can-uygur
[product-screenshot]: images/screenshot.png
[GraphQL-logo]: https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc52e614a-111a-4f0b-bb50-6c393b8b8afe%2FGQ.png&blockId=b2a86132-2bf7-430e-b216-158fd627ea99&width=256
[GraphQL]: https://graphql.org/
[JavaScript-logo]: https://static-00.iconduck.com/assets.00/javascript-icon-256x256-0ybhyms4.png
[JavaScript]: https://www.javascript.com/
[MUI-logo]: https://www.svgviewer.dev/static-svgs/14213/material-ui.svg
[MUI]: https://mui.com/
[Nextjs-logo]: https://gitlab.com/uploads/-/system/project/avatar/18080731/nextjs.png
[Nextjs]: https://nextjs.org/
[Nodejs-logo]: https://global.synologydownload.com/download/Package/img/Node.js_v16/16.20.2-2014/thumb_256.png
[Nodejs]: https://nodejs.org/en
[React-logo]: https://static-00.iconduck.com/assets.00/react-icon-256x256-2yyldh38.png
[React]: https://react.dev/
[Redis-logo]: https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/nnx4nbt0sh5uewamtkz0
[Redis]: https://redis.io/
[Redux-logo]: https://miro.medium.com/v2/resize:fit:256/1*uII4elorSUwsIA5m1j-o2w.png
[Redux]: https://redux.js.org/
[Tailwind-logo]: https://tailwindcss.com/_next/static/media/tailwindcss-logotype.a1069bda.svg
[Tailwind]: https://tailwindcss.com/
[TypeScript-logo]: https://ms-vscode.gallerycdn.vsassets.io/extensions/ms-vscode/vscode-typescript-next/5.8.20241203/1733271143236/Microsoft.VisualStudio.Services.Icons.Default
[TypeScript]: https://www.typescriptlang.org/
