## Getting Started

1. Install `zx` in your system
    ```bash 
    yarn global add zx
    ```
   
2. Install dependencies (don't use `yarn install`, because it doesn't take care about common for web)
    ```bash 
    yarn bootstrap
    ```
   
3. Run db in docker
   ```bash 
   cd my-inventory-backend
   docker-compose up
   ```
   
4. Run backend
    ```bash 
    yarn be start:dev
    ```
   
5. Run web
    ```bash 
    yarn fe dev
    ```

__CAUTION__ !!

After each common update you need to run this command 
```bash 
    yarn common:build
```
or
```bash 
    yarn common build
    yarn fe clean
    yarn
```
