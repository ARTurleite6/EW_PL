<center>
<h1>
    Engenharia Web-3º Ano de Curso
    </h1>
<h2> Trabalho Prático - Relatório de Desenvolvimento</h2>
<h3> Proposta Nº2-Inquirições de Génere</h3>

<img title="Escola de Engenharia" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/transferir.png">

<h4>
    Hugo dos Santos Martins - a95125
</h4> 
<h4>
    João Bernardo Teixeira Escudeiro - a96075
</h4> 
<h4>
    Artur Jorge Castro Leite - a97027
</h4> 
<h4> 30 de junho de 2023 </h4>

<h1>
</h1>
<h2> Introdução </h2>
Neste relatório, apresentamos o desenvolvimento e implementação de um sistema de gestão e navegação de dados genealógicos, com base num dataset fornecido. Este trabalho envolveu uma análise cuidadosa do dataset, com especial atenção ao campo "Scope and Content", que contém informações valiosas sobre relações genealógicas. O desafio foi tratar e organizar estes dados de forma a serem carregados no MongoDB, e materializar as relações genealógicas entre os registos sempre que possível.
Para tornar estes dados acessíveis e navegáveis, desenvolvemos uma interface web que permite aos utilizadores explorar os registos de várias maneiras. A interface permite a navegação por nome e data, facilitando a pesquisa e descoberta de informações específicas. Além disso, a interface permite a adição de novos registos, aumentando assim a riqueza e abrangência do dataset.
O sistema também permite que os administradores editem a informação de um registo, incluindo a adição de novas relações entre registos. Esta funcionalidade permite que o dataset seja continuamente enriquecido e atualizado com novas informações e relações.Além disso, o sistema permite que os utilizadores façam um Post sobre um registo.
Este relatório detalha o processo de desenvolvimento deste sistema, desde a análise inicial do dataset até à implementação da interface web e funcionalidades de interação do utilizador. 



<h2>
    Análise e Especificação
    </h2> 
O grupo organizou o trabalho em etapas,após analisar os requisitos, para conseguir trabalhar de uma forma mais organizada e eficaz. As etapas são:
<h4> Etapa 1 - Escolha do Tema</h4>    
<h4> Etapa 2 - Análise do dataset</h4>
<h4> Etapa 3 - Importação do dataset no MongoDB</h4>
<h4> Etapa 4 - Criação da API de Dados</h4>
<h4> Etapa 5 - Criação das rotas do Front-End</h4>
<h4> Etapa 6 - Interface</h4>
<h4> Etapa 7 - Autenticação</h4>
<h4> Etapa 8 - Registo</h4>
<h4> Etapa 9 - Docker</h4>


<h2> Conceção/Desenho da Realização</h2>
<h3>  1.Escolha do Tema</h3>
     Após serem disponibilizados os temas possíveis de serem escolhidos para a realização do trabalho, e após analisar detalhadamente cada um deles bem como os respetivos requisitos, o grupo optou pela proposta Nº 2-Inquirições de Génere. Este pareceu-nos o tema mais interessante, visto que ainda não conhecíamos as Inquirições de Génere, nem a forma como funcionavam.
<h1></h1>
<h3>2.Análise do dataset</h3>
     O grupo analisou o dataset para verificar se haviam inconsistências.O dataset fornecido era um ficheiro CSV, então criou-se um script em python(dataset/csv_to_json.csv), com a finalidade de converter o ficheiro original num ficheiro JSON, para que conseguir importar o dataset no MongoDB.No dataset final(JSON) é também adicionada uma coluna que contém um array com os ids de cada uma das pessoas com as quais aquela pessoa tem relação (campo "RelatedMaterial").
    <h1></h1>

<h3>3.Importação do dataset no MongoDB</h3>
     Finalizado o tratamento do dataset, o grupo criou uma Base de dados no MongoDB com o nome : Genesis e com a coleção : Genesis
    <h1></h1>
<h3>4.Criação da API de Dados</h3>
    O grupo construiu uma API de Dados que ajudará na resposta aos pedidos realizados pelo utilizador no Front-End sobre a Base de Dados.
        
 Foram criadas os seguintes caminhos : 



| Rota | Métodos | Descrição |
| -------- | -------- | -------- |
| /api/authentication/register    | POST     |Guarda um utilizador novo na base de dados |
| /api/authentication/login | POST |Valida dados de autenticação |
| /api/genesis/:id | GET|Rota para obter uma entrada na base de dados com o id fornecido |
| /api/genesis | GET,POST |GET->Lista de Inquisições;             POST -> Cria uma inquisição nova |

<h1></h1>
    
<h3>5.Criação das rotas do Front-End</h3>

| Rota |  Descrição |
| -------- |  -------- |
| /    | Rota default, que apresenta a lista de todas as inquisições |
| /login |Rota que apresenta a página de Login  |
| /register |Rota que apresenta a página de Registo  |
| /genesis/edit/:id |Rota que mosta a página de edição de um registo na Base de dados  |
| /genesis/new |Rota que apresenta a página em que se pode criar um registo  |
| /genesis/:id |Rota que apresenta a página com toda a informação de um registo  |
<h1></h1>
    
<h3>6.Interface</h3>
Para tornar o programa visualmente apelativo e fácil de utilizar, o grupo criou algumas páginas em PUG, para que os utilizadores consigam navegar facilmente entre páginas e consigam realizar as ações pretendidas.
De seguida são apresentadas as páginas e uma breve explicação do conteúdo das mesmas.
<h4>
        Página Inicial (/)
</h4>
Após realizar o login, é apresentada a página inicial que está na figura abaixo. Nela é possível observar uma lista de Inquirições, que são listadas em várias páginas para facilitar a navegação pelas inquirições. É também possível aumentar o número de registos apresentados.
Para além disto, existe uma barra de pesquisa através da qual é possível procurar por nome(s), ou até mesmo por intervalo de datas.
O grupo optou por mostrar apenas esta informação,pois achou que seria a informação ,mais relevante.
    <img title="Init Page" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/initpage.png" width="1000" >
    <h2></h2>
<h4>
        Página de Inquirição (/genesis/:id)
</h4>
Na página de inquirição, é possível observar todos os campos daquele documento, inclusive as relações, para as quais existe um link para navegar para a mesma.Para os administradores é possível editar um registo, ou até mesmo eliminá-lo.

 <img title="Inq Page" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/inqpage.png" width="1000" >
    <h2></h2>
    
<h4>
        Página de adição de registo (/genesis/new)
</h4>
Como oprópio nome indica, nesta página é possível criar um registo(apenas para Administradores), inserindo os diversos campos(alguns obrigatórios, outros facultativos).É possível adicionar relações já existentes, que aparecem listadas.
<img title="ADD Page" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/createpage.png" width="800" >
    <h2></h2>
    
<h4>
        Página de edição de registo (/genesis/edit/:id)
</h4>
Esta página permite que os administradores editem uma inquisição. Os campos aparecem automáticamente preenchidos com as informações contidas na Base de Dados.
    <img title="Edit Page" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/editpage.png" width="800" >

    De notar que foram adicionados botões auxiliares para voltar e fazer LOG OUT, para facilitar a navegação pelas páginas.

<h1></h1>
    
<h3>7.Autenticação</h3>
Tal como sugerido no Enunciado, o grupo incluiu dois tipos de utilizadores possívies: Administrador e Consumidor.Ambos tem permissões diferentes.

O Consumidor apenas pode navegar pelas inquisições e observá-las, enquanto que o Administrador é capaz de adicionar,editar e eliminar inquisições.

Para autenticação é necessário indicar o email e uma password.Esta informação vai no corpo do pedido.
Caso a autenticação seja válida é criado um token que contém id do user, email, nome e tipo de utilizador.

<img title="Autenticação" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/image.png" width="400" >

<h1></h1>
<h3>8.Registo</h3>
    Para registar um utilizador na base de dados é necessário inserir Nome, E-mail, Password e o tipo de Utilizador.
    <img title="Registo" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/registo.png" width="400" >
<h1></h1>
    


<h1></h1>
<h3>9.Docker</h3>
Por fim, e após terminar a implementação de todas as funcionalidades às quais nos propusemos, o grupo utilizou o docker, de forma a fornecer uma maneira consistente e confiável de empacotar a aplicação, e poder ser utilizada noutras máquinas distintas da original.
    

<h1></h1>
  
    
<h2 >Conclusão
    </h2> 
Em conclusão, o desenvolvimento deste sistema de gestão e navegação de dados genealógicos representou um desafio significativo, mas também uma oportunidade para explorar novas formas de organizar, apresentar e interagir com dados complexos. Através de uma análise cuidadosa do dataset fornecido e da implementação de técnicas de tratamento de dados, conseguimos transformar um conjunto de informações aparentemente desconexas num recurso valioso para a pesquisa genealógica.
A interface web desenvolvida permite uma navegação intuitiva e flexível pelos registos, facilitando a descoberta de relações e padrões. A possibilidade de adicionar novos registos e editar informações existentes garante que o sistema possa continuar a crescer e a evoluir.
Este trabalho demonstrou o potencial do uso de bases de dados NoSQL, como o MongoDB, para gerir e explorar grandes volumes de dados de forma eficiente. No entanto, também destacou a importância de uma análise e tratamento de dados cuidadosos para garantir a qualidade e utilidade dos dados.
Caso houvesse mais tempo o grupo poderia melhorar um pouco o design gráfico, visto que optámos por páginas minimalistas que apenas contivessem informação relevante ao utilizador.
</center>

</center>
