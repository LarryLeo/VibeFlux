# ✅ 顶部声明语法版本，确保 BuildKit 特性（如 cache mount）被完美支持
# syntax=docker/dockerfile:1

# Stage 1: Build the React application
# 💡 优化点 1：移除了 --platform=$BUILDPLATFORM，避免多架构构建时的原生依赖编译冲突
FROM node:22-alpine AS build

# Install git (如果你的项目依赖中有通过 git url 引入的包，则保留，否则可删除以减小体积)
RUN apk add --no-cache git

# enable corepack to use pnpm
RUN corepack enable

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# ✅ 核心优化点 2：使用 BuildKit 缓存挂载加速 pnpm install
# target 指向 pnpm 的全局 store 目录，id 用于隔离缓存
RUN --mount=type=cache,target=/root/.local/share/pnpm/store,id=pnpm_store \
    pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the project
RUN pnpm run build

# Stage 2: Run the server using Caddy
FROM caddy:2-alpine

# 💡 优化点 3：请确认你的构建产物目录是 build 还是 dist (Vite 默认是 dist，CRA 默认是 build)
COPY --from=build /app/build /srv

# Caddy will pick up the Caddyfile automatically
COPY Caddyfile /etc/caddy/Caddyfile

# Expose the port Caddy listens on
EXPOSE 2000

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
