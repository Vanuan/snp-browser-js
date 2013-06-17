# snp-browser-js


## Download the source code

    git clone https://github.com/Vanuan/snp-browser-js.git
    git submodule init
    git submodule update


## Usage

1. Install mongodb

        sudo apt-get install mongodb

2. Install node and npm dependencies

        sudo apt-get install node
        npm install

3. Import from your 23andme raw data to mongodb

        node server/import.js dna/data.txt
        
4. Run app

        node server/app.js

5. Open `http://localhost:4000`

