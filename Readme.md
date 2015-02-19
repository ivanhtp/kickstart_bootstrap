# Static

## Documentação
Para maiores informações sobre o projeto Static visite a [Página Wiki](https://bitbucket.org/directtalk/static/wiki/Home) do projeto.

## Static em 1 minuto
Para execução do projeto em um servidor em localhost, siga os seguintes passos:

* Instale o [nodejs](http://nodejs.org), o [ruby](https://www.ruby-lang.org/pt/) e o [git](http://git-scm.com/download)

* Instale os frameworks compass e zurb-foundation utilizando o gerenciador de pacotes [RubyGem](http://en.wikipedia.org/wiki/RubyGems) (já instalado com o Ruby)
```
gem update --system
gem install compass
gem install bootstrap-sass -v 3.1.1
```

* Instale o Grunt utilizando o gerenciador de pacotes [npm](http://npmjs.org) (Já instalado com o NodeJs)
```
npm install -g grunt-cli
```

* Clone o repositório do projeto (troque o valor do seu username na URL):
```
git clone https://bsantanna@bitbucket.org/directtalk/static.git
```

* Dentro de um terminal, acesse a pasta *static* criada:
```
cd static
```

* Mude para a branch beta que contém as últimas atualizações:
```
git checkout beta
```

* Faça um build do projeto:
```
grunt
```

* Inicie o servidor http embarcado com o seguinte comando:
```
node backend/static.js
```

*  Em seu navegador favorito, acesse um dos [Mocks](https://bitbucket.org/directtalk/static/wiki/Mocks)

## Static + IIS 6
O Static suporta integração com o servidores http utilizando técnica de [proxy reverso](http://pt.wikipedia.org/wiki/Proxy_reverso). Essa integração é especialmente útil quando você precisar testar o Static com dados reais vindos de um servidor web IIS e dados falsos (mocks) servidos pelo Static.

Para configurar a integração:

* Modifique o arquivo de hosts local de sua máquina, adicionando a seguinte linha (substituindo pelo ip correto do servidor de aplicação).

```
192.168.0.x		vmapp.directtalk.com.br
```

* Caso a vm de aplicação (vmapp) tenha um nome diferente de _vmapp.directtalk.com.br_, modifique também a propriedade __httpServer__ do arquivo __package.json__ localizado na raíz do projeto. 

* Inicie o servidor com proxy ativo:

```
node backend/proxy.js
```

* Adicione a seguinte entrada na seção  __Hostheaders__ do arquivo __dsn.xml__ da vm de aplicação (vmapp)

```
<Header>vmapp.directtalk.com.br:80</Header>
```

* Acesse em seu navegador uma página publicada no servidor IIS:
[http://localhost:8000/admin](http://localhost:8000/admin)

## Deploy via FTP
O Static suporta deploy via FTP utilizando o gerenciador de build [Grunt](http://gruntjs.com/).
Para configurar o deploy via FTP:

* Defina a propriedade __httpServer.host__ apontando para o ip do servidor HTTP no arquivo __package.json__ que está localizado na raiz do projeto.
* Adicione as credenciais de acesso ao arquivo __.ftppass__ que está localizado na raiz do projeto.
* Depois de realizar as mudanças, em um terminal execute o Grunt na raiz do projeto para fazer o build do projeto, comprimir os arquivos js, html e css, e criar  o diretório de distribuição:

```
grunt
```

* Execute o comando de deploy ftp:

```
grunt ftp-deploy
```

* FTP-Deploy para as máquinas na AWS: 

Target está definido em package.json e as Keys em .ftppass

```
grunt ftp-deploy --target=maquina --key=key
```


