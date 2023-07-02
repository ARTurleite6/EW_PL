<center>
<h1>
    Engenharia Web-3º Ano de Curso
    </h1>
<h2> Trabalho Prático - Relatório de Desenvolvimento</h2>

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
Para tornar estes dados acessíveis e navegáveis, desenvolvemos uma interface web que permite aos utilizadores explorar os registos de várias maneiras. A interface permite a navegação por nome, lugar e data, facilitando a pesquisa e descoberta de informações específicas. Além disso, a interface permite a adição de novos registos, aumentando assim a riqueza e abrangência do dataset.
O sistema também permite que os administradores editem a informação de um registo, incluindo a adição de novas relações entre registos. Esta funcionalidade permite que o dataset seja continuamente enriquecido e atualizado com novas informações e relações.Além disso, o sistema permite que os utilizadores façam um Post sobre um registo.
Este relatório detalha o processo de desenvolvimento deste sistema, desde a análise inicial do dataset até à implementação da interface web e funcionalidades de interação do utilizador. 



<h2>
    Análise e Especificação
    </h2> 
O grupo organizou o trabalho em etapas, para conseguir trabalhar de uma forma mais organizada e eficaz. As etapas são:
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
     Após serem disponibilizados os temas possiveis a serem escolhidos para a realização do trabalho, e após analisar detalhadamente cada um deles, bem como os respetivos requisitos, o grupo optou pela proposta Nº 2-Inquirições de Génere. Este pareceu-nos o tema mais interessante, visto que ainda não conhecíamos as Inquirições de Génere, nem a forma como funcionavam.
<h1></h1>
<h3>2.Análise do dataset</h3>
     O grupo analisou o dataset para verificar se haviam inconsistências.O dataset fornecido era um ficheiro CSV, então o grupo criou um script em python, com a finalidade de converter o ficheiro original num ficheiro JSON, para que se conseguisse importar o dataset no MongoDB.No dataset final(JSON) é também adicionada uma coluna que contém um array com os ids de cada uma das pessoas com as quais aquela pessoa tem relação (campo "RelatedMaterial").
    <h1></h1>

<h3>3.Importação do dataset no MongoDB</h3>
     Finalizado o tratamento do dataset, o grupo criou uma base de dados no MongoDB com o nome : Genesis e com a coleção : Genesis
    <h1></h1>
<h3>4.Criação da API de Dados</h3>
    O grupo construiu uma API de Dados que ajudará na resposta aos pedidos realizados pelo utilizador no Front-End sobre a base de Dados.
        
 Foram criadas os seguintes caminhos : 



| Rota | Métodos | Descrição |
| -------- | -------- | -------- |
| /api/authentication/register    | POST     | |
| /api/authentication/login | POST | |
| /api/genesis/:id | GET|Rota para obter uma entrada na base de dados com o id fornecido |
| /api/genesis | GET,POST | |

<h1></h1>
    
<h3>5.Criação das rotas do Front-End</h3>

| Rota |  Descrição |
| -------- |  -------- |
| /    | Rota default, que apresenta  |
| /login |Rota que apresenta a página de Login  |
| /register |Rota que apresenta a página de Registo  |
| /genesis/edit/:id |Rota que mosta a página de edição de um registo na Base de dados  |
| /genesis/new |Rota que apresenta a página em que se pode criar um registo  |
| /genesis/:id |Rota que apresenta a página com toda a informação de um registo  |
<h1></h1>
    
<h3>6.Interface</h3>

<h1></h1>
    
<h3>7.Autenticação</h3>
Tal como sugerido no Enunciado, o grupo incluiu dois tipos de utilizadores possívies: Administrador e Consumidor.Ambos tem permissões diferentes.

O Consumidor apenas pode navegar pelas inquisições e observá-las, enquanto que o Administrador é capaz de adicionar,editar e eliminar inquisições.

Para autenticação é necessário indicar o email e uma password.Esta informação vai no corpo do pedido.
Caso a autenticação seja válida é criado um token que contém id do user, email, nome e tipo de utilizador 
<img title="Autenticação" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/image.png" width="400" 
     height="400">

<h3>8.Registo</h3>
    Para registar um utilizador na base de dados CONTINUA
    <img title="Registo" alt="Alt text" src="https://github.com/ARTurleite6/EW_PL/blob/main/pics/registo.png" width="400" 
     height="400">
<h1></h1>
    


<h1></h1>
<h3>9.Docker</h3>

<h1></h1>
  
    
<h2 >Conclusão
    </h2> 
Em conclusão, o desenvolvimento deste sistema de gestão e navegação de dados genealógicos representou um desafio significativo, mas também uma oportunidade para explorar novas formas de organizar, apresentar e interagir com dados complexos. Através de uma análise cuidadosa do dataset fornecido e da implementação de técnicas de tratamento de dados, conseguimos transformar um conjunto de informações aparentemente desconexas num recurso valioso para a pesquisa genealógica.
A interface web desenvolvida permite uma navegação intuitiva e flexível pelos registos, facilitando a descoberta de relações e padrões. A possibilidade de adicionar novos registos e editar informações existentes garante que o sistema possa continuar a crescer e a evoluir.
Este trabalho demonstrou o potencial do uso de bases de dados NoSQL, como o MongoDB, para gerir e explorar grandes volumes de dados de forma eficiente. No entanto, também destacou a importância de uma análise e tratamento de dados cuidadosos para garantir a qualidade e utilidade dos dados.
No futuro, pretendemos...
</center>
Este trabalho demonstrou o potencial do uso de bases de dados NoSQL, como o MongoDB, para gerir e explorar grandes volumes de dados de forma eficiente. No entanto, também destacou a importância de uma análise e tratamento de dados cuidadosos para garantir a qualidade e utilidade dos dados.
No futuro, pretendemos...
</center>
