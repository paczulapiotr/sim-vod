#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base

ENV FFMPEG_PATH "ffmpeg"
ENV VOD_PATH "/app/vod/"
ENV MONGO_DB_NAME "simdb"
ENV MONGO_PATH "mongodb://localhost:27017"
RUN apt-get update
RUN apt -y install sudo
RUN sudo apt -y install ffmpeg=7:4.1.4-1~deb10u1

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["SimVodServer.API/SimVodServer.API.csproj", "SimVodServer.API/"]
RUN dotnet restore "SimVodServer.API/SimVodServer.API.csproj"
COPY . .
WORKDIR "/src/SimVodServer.API"
RUN dotnet build "SimVodServer.API.csproj" -c Release -o /app/build
RUN dotnet publish "SimVodServer.API.csproj" -c Release -o /app/publish

FROM base AS final
EXPOSE 5000
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SimVodServer.API.dll"]
