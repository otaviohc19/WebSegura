// src/pages/Golpes.jsx
import { useState } from "react";
import Menu from "../../components/menu";
import Footer from "../../components/footer";
import MenuLateral from "../../components/menuLateral";

export default function Golpes() {
  // Tipos de golpes com descrições detalhadas
  const tiposDeGolpes = {
    Phishing: {
      descricao: "Phishing é um ataque que usa mensagens fraudulentas para enganar o usuário e obter dados confidenciais, como senhas e informações bancárias. Os golpistas se passam por empresas legítimas, enviando e-mails, mensagens ou links para sites falsos, onde pedem ao usuário que insira informações pessoais.",
      exemplos: [
        "E-mails falsos de bancos pedindo atualização de informações pessoais.",
        "Mensagens SMS alertando sobre uma 'suspensão' na conta e pedindo dados de login.",
        "Links em redes sociais prometendo prêmios, redirecionando para páginas de login falsas."
      ],
      protecao: "Desconfie de e-mails e mensagens que pedem dados pessoais ou financeiros. Verifique a URL de sites antes de inserir informações, evitando clicar diretamente nos links. Utilize autenticação em duas etapas sempre que possível."
    },
    "Vírus Ransomware": {
    descricao: "O Ransomware é um tipo de vírus que criptografa os arquivos do computador da vítima e exige um resgate (geralmente em criptomoedas) para desbloquear o acesso aos dados. Os arquivos ficam inacessíveis até que o pagamento seja feito, mas não há garantia de que o pagamento resultará na recuperação dos dados.",
    exemplos: [
      "Mensagem de resgate informando que os arquivos estão criptografados e exigindo pagamento para liberação.",
      "Ficheiros com a extensão alterada para '.locked' ou outras extensões incomuns.",
      "Alertas dizendo que o sistema foi 'bloqueado' por uma 'organização criminosa' até o pagamento de um valor."
    ],
    protecao: "Mantenha seu antivírus atualizado, faça backups regulares e não clique em links suspeitos ou abra anexos de fontes desconhecidas."
  },
  "Vírus Cavalo de Troia (Trojan)": {
    descricao: "O Cavalo de Troia é um tipo de vírus disfarçado como um programa legítimo. Quando executado, ele dá acesso remoto ao atacante, permitindo roubo de dados, controle do sistema e até a instalação de outros malwares.",
    exemplos: [
      "Programas baixados de fontes não confiáveis que, ao serem executados, instalam malware no computador.",
      "Arquivos de software falsificados ou cracks para programas pagos que na verdade são maliciosos.",
      "Sites de download que oferecem versões 'gratuitas' de programas populares, mas que instalam vírus disfarçados."
    ],
    protecao: "Evite baixar programas de fontes não confiáveis, sempre faça a verificação do software com antivírus antes de abrir ou executar qualquer arquivo baixado."
  },
  "Vírus Keylogger": {
    descricao: "O Keylogger é um tipo de malware que registra todas as teclas pressionadas no computador da vítima. Ele é utilizado para capturar informações sensíveis, como senhas, números de cartão de crédito e dados bancários.",
    exemplos: [
      "Captura de senhas e logins digitados em sites bancários ou de redes sociais.",
      "Instalação silenciosa, sem que o usuário perceba que está sendo monitorado.",
      "Páginas de login falsas que, ao serem preenchidas, gravam as informações inseridas pelo usuário."
    ],
    protecao: "Use autenticação em dois fatores, mantenha o antivírus atualizado e evite clicar em links desconhecidos ou abrir anexos de e-mails suspeitos."
  },
  "Vírus Worm (Verme)": {
    descricao: "O Worm é um tipo de vírus autorreplicante que se propaga de um computador para outro, sem a necessidade de interação do usuário. Ele pode causar lentidão no sistema, roubo de dados e até a instalação de outros tipos de malwares.",
    exemplos: [
      "Vírus que se espalham através de redes ou por meio de e-mails com anexos maliciosos.",
      "Computadores infectados que se tornam parte de uma rede maior de máquinas comprometidas.",
      "Ataques coordenados a sites ou servidores com sobrecarga de tráfego (ataques DDoS)."
    ],
    protecao: "Implemente firewalls, mantenha o sistema e os aplicativos atualizados e evite abrir e-mails ou links desconhecidos."
  },
  "Vírus Adware": {
    descricao: "Adware é um tipo de software malicioso projetado para exibir anúncios indesejados no dispositivo da vítima. Além de ser irritante, pode coletar dados pessoais e causar a instalação de outros tipos de vírus.",
    exemplos: [
      "Exibição constante de pop-ups e anúncios enquanto navega na internet.",
      "Instalação de programas de anúncios indesejados que monitoram seu comportamento online.",
      "Desempenho lento do sistema devido à sobrecarga de anúncios e processos em segundo plano."
    ],
    protecao: "Evite baixar softwares que não sejam de fontes confiáveis, use bloqueadores de anúncios e faça verificações regulares com antivírus."
  },
  "Vírus Spyware": {
    descricao: "Spyware é um tipo de malware que coleta informações pessoais e privadas do usuário sem seu conhecimento. Pode rastrear hábitos de navegação, dados bancários, senhas e até gravações de voz ou vídeo.",
    exemplos: [
      "Rastreamento de atividades online e envio de informações pessoais para os golpistas.",
      "Instalação de aplicativos ou extensões de navegador que monitoram o uso do dispositivo.",
      "Mudança no comportamento do navegador, como redirecionamento de sites ou inserção de pop-ups."
    ],
    protecao: "Mantenha seu sistema e navegador atualizados, instale um bom antivírus e evite fornecer informações pessoais em sites não seguros."
  },
  "Vírus Rootkit": {
    descricao: "O Rootkit é um tipo de vírus que permite ao atacante ter controle total sobre o sistema da vítima, geralmente sem ser detectado. Ele pode ocultar a presença de outros malwares, como trojans e keyloggers, e facilitar o acesso remoto ao sistema comprometido.",
    exemplos: [
      "Instalação oculta no sistema operacional, permitindo que o atacante mantenha o controle do dispositivo por longos períodos.",
      "Alteração de arquivos do sistema para esconder a presença de malwares.",
      "Acesso remoto ao computador da vítima sem que ela perceba."
    ],
    protecao: "Use ferramentas de detecção especializadas, faça verificações regulares do sistema e mantenha o antivírus atualizado."
  },
  "Vírus Botnet": {
    descricao: "Botnets são redes de computadores infectados controlados por um atacante, que os utiliza para realizar atividades ilícitas, como ataques DDoS, envio de spam ou mineração de criptomoedas sem o consentimento dos donos dos dispositivos.",
    exemplos: [
      "Seu computador é usado para enviar e-mails de spam ou realizar ataques a servidores.",
      "Sua máquina é controlada remotamente, sem o seu conhecimento, para realizar atividades criminosas.",
      "Aumento no consumo de recursos do sistema devido à atividade de botnet em segundo plano."
    ],
    protecao: "Mantenha o software e antivírus atualizados, e evite clicar em links ou baixar anexos de fontes desconhecidas."
  },
    "Roubo de Identidade": {
      descricao: "O roubo de identidade ocorre quando um golpista usa dados pessoais da vítima, como nome, CPF e número de cartão, para realizar compras, abrir contas bancárias, obter empréstimos ou praticar outras fraudes. Esse golpe pode causar graves prejuízos financeiros e danos à reputação da vítima.",
      exemplos: [
        "Compras online realizadas com dados de cartão roubados.",
        "Abertura de contas e solicitação de empréstimos usando dados pessoais da vítima.",
      ],
      protecao: "Proteja seus documentos e dados pessoais, evite divulgar informações privadas em redes sociais, e monitore seu histórico de crédito regularmente para identificar movimentações suspeitas."
    },
    "Fraude Financeira": {
      descricao: "Fraudes financeiras envolvem enganos para obter dinheiro ilegalmente, geralmente por meio de investimentos falsos, cobranças de taxas antecipadas, ou compras enganosas. Promessas de retornos altos e rápidos são comuns para atrair vítimas e convencê-las a investir ou pagar.",
      exemplos: [
        "Propostas de investimento em criptomoedas com garantia de retorno elevado.",
        "Empresas de empréstimo que exigem pagamento de taxas antecipadas e depois desaparecem.",
        "Compras em sites de produtos a preços muito baixos, que não entregam os itens."
      ],
      protecao: "Pesquise a reputação da empresa ou do investidor, desconfie de promessas de retorno garantido e evite fornecer dados financeiros sem uma verificação cuidadosa."
    },
    "Golpe de Romance": {
      descricao: "No golpe de romance, golpistas criam perfis falsos em sites de relacionamento e redes sociais, ganham a confiança da vítima e, após estabelecerem uma conexão emocional, pedem ajuda financeira ou informações pessoais. Eles frequentemente se apresentam como profissionais que estão no exterior.",
      exemplos: [
        "Perfis em sites de namoro que rapidamente pedem ajuda financeira.",
        "Golpistas que fingem ser militares ou médicos e dizem precisar de dinheiro para emergências.",
        "Mensagens de 'paquera' enviadas por estranhos que depois solicitam empréstimos."
      ],
      protecao: "Evite enviar dinheiro ou compartilhar informações pessoais com alguém que você acabou de conhecer online. Faça pesquisas sobre a identidade da pessoa e desconfie de pedidos de ajuda financeira logo no início da relação."
    },
    "Golpe Bancário (Simulação de Atendimento)": {
    descricao: "Golpes bancários, como a simulação de atendimento, envolvem golpistas que se passam por funcionários de bancos e ligam ou enviam mensagens para a vítima. Eles solicitam informações bancárias, números de cartões ou até pedem para a vítima transferir dinheiro, alegando que é uma questão de segurança ou atualização da conta.",
    exemplos: [
      "Telefonemas alegando que sua conta está comprometida e pedindo para 'confirmar' dados.",
      "E-mails falsos informando que houve uma tentativa de acesso à conta e solicitando confirmação dos dados bancários.",
      "SMS alertando sobre 'suspensão' de serviços bancários e pedindo transferência de valores para contas seguras."
    ],
    protecao: "Nunca forneça dados bancários por telefone ou e-mail. Desconfie de qualquer contato que solicite informações sensíveis e entre em contato diretamente com o banco por canais oficiais para esclarecer a situação."
  },
  "Engenharia Social (Manipulação Psicológica)": {
    descricao: "Engenharia social é uma técnica em que o golpista manipula psicologicamente a vítima para obter informações confidenciais. Os atacantes podem usar táticas como urgência, autoridade ou amizade para convencer a pessoa a realizar ações que normalmente não faria, como fornecer senhas ou transferir dinheiro.",
    exemplos: [
      "Golpistas se passando por colegas de trabalho para obter acesso a sistemas internos.",
      "E-mails ou mensagens que afirmam ser de familiares em dificuldades e pedem ajuda financeira urgente.",
      "Ligação de 'autoridades' solicitando informações confidenciais com um tom de urgência."
    ],
    protecao: "Esteja ciente das técnicas psicológicas utilizadas para manipular suas decisões. Nunca forneça informações confidenciais sem verificar a identidade de quem está solicitando e desconfie de pedidos feitos sob pressão ou urgência."
  },
  "Golpe de Investimento Falso": {
    descricao: "O golpe de investimento falso envolve propostas de oportunidades de investimento altamente lucrativas, que garantem retornos rápidos e altos. Os golpistas fazem promessas que parecem boas demais para serem verdadeiras, como investimentos em criptomoedas, ações ou novos mercados financeiros.",
    exemplos: [
      "Propostas de investimentos em criptomoedas com promessas de retornos exorbitantes.",
      "Plataformas que oferecem ganhos rápidos em investimentos financeiros, sem transparência sobre o risco.",
      "Empresas que solicitam grandes quantias de dinheiro inicialmente para um 'fundo de investimento'."
    ],
    protecao: "Pesquise a empresa ou o investidor antes de realizar qualquer tipo de investimento. Verifique se a empresa é regulamentada por órgãos oficiais e desconfie de promessas de retorno rápido e garantido."
  },
  "Golpe de Troca de SIM (SIM Swap)": {
    descricao: "O golpe de troca de SIM envolve o golpista usando informações pessoais da vítima para enganar a operadora de telefonia e transferir o número de celular para um novo chip. Com isso, o golpista pode acessar mensagens de texto, autenticação de dois fatores e outros dados sensíveis.",
    exemplos: [
      "Golpistas que ligam para a operadora fingindo ser a vítima e solicitam a troca do chip.",
      "Acesso a contas bancárias e de redes sociais através de códigos de autenticação recebidos por SMS.",
      "Solicitação de desbloqueio de contas usando um novo chip após a troca de SIM."
    ],
    protecao: "Solicite à sua operadora um bloqueio de troca de SIM sem sua autorização e utilize autenticação em dois fatores baseada em aplicativos (não SMS)."
  },
  "Golpe de Suporte Técnico": {
    descricao: "Golpes de suporte técnico envolvem golpistas que se passam por representantes de empresas de tecnologia, como Microsoft ou Apple. Eles alegam que o dispositivo da vítima tem um vírus ou problema sério e oferecem serviços de reparo pagos, ou pedem acesso remoto ao dispositivo.",
    exemplos: [
      "Chamadas telefônicas alertando sobre um suposto vírus e oferecendo suporte pago.",
      "Pop-ups na internet com avisos falsos pedindo para ligar para um 'suporte técnico'.",
      "E-mails falsos com o logotipo de grandes empresas dizendo que a conta está comprometida."
    ],
    protecao: "Nunca aceite suporte técnico não solicitado, evite ligar para números fornecidos por pop-ups suspeitos e desconfie de qualquer mensagem que peça para você conceder acesso remoto ao seu dispositivo."
  },
  "Golpe do Empréstimo Falso": {
    descricao: "Golpes de empréstimos falsos envolvem empresas ou indivíduos que oferecem empréstimos com taxas de juros muito baixas ou condições que parecem impossíveis de recusar. O golpista solicita o pagamento de taxas ou custos antecipados antes de liberar o dinheiro, mas desaparece após o pagamento.",
    exemplos: [
      "Ofertas de empréstimos com aprovação rápida e taxas de juros extremamente baixas.",
      "Solicitação de taxas de processamento ou seguros antes do empréstimo ser liberado.",
      "Plataformas de crédito que exigem pagamento antecipado para liberar o crédito prometido."
    ],
    protecao: "Nunca pague taxas antecipadas para receber um empréstimo. Verifique a reputação da instituição financeira e consulte órgãos reguladores antes de aceitar ofertas."
  },
  "Golpe de Falsa Caridade": {
    descricao: "No golpe de falsa caridade, golpistas se passam por organizações de caridade ou pessoas em necessidade para pedir dinheiro. Eles utilizam apelos emocionais, como doenças graves ou desastres naturais, para convencer as vítimas a fazerem doações.",
    exemplos: [
      "Mensagens ou e-mails solicitando doações para vítimas de desastres naturais, com links para sites falsos de caridade.",
      "Pedidos de ajuda financeira de 'amigos' ou 'familiares' que estão em situação difícil, mas são perfis falsos.",
      "Campanhas de arrecadação de fundos falsas para causas de saúde ou educação."
    ],
    protecao: "Pesquise a organização antes de fazer qualquer doação e prefira contribuir com entidades conhecidas e registradas oficialmente."
  }
  };

  // Estado para o tipo de golpe selecionado
  const [golpeSelecionado, setGolpeSelecionado] = useState("");
  const [descricaoGolpe, setDescricaoGolpe] = useState(null);

  // Função para lidar com a mudança do tipo de golpe selecionado
  const handleTipoChange = (event) => {
    const tipo = event.target.value;
    setGolpeSelecionado(tipo);
    setDescricaoGolpe(tiposDeGolpes[tipo]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className="flex flex-1 ml-16 mt-2 mb-10">
        {/* Conteúdo principal */}
        <div className="flex-1 p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Conheça os Principais Golpes</h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Selecione um tipo de golpe abaixo para saber mais sobre ele e como se proteger.
          </p>

          {/* Select para escolher o tipo de golpe */}
          <div className="mb-8 text-center">
            <label htmlFor="tipoDeGolpe" className="block text-lg font-medium text-gray-700 mb-2">
              Selecione o Tipo de Golpe
            </label>
            <select
              id="tipoDeGolpe"
              value={golpeSelecionado}
              onChange={handleTipoChange}
              className="mt-2 block w-1/2 mx-auto border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Selecione um tipo</option>
              {Object.keys(tiposDeGolpes).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Descrição do golpe selecionado */}
          {descricaoGolpe && (
            <div className="text-gray-700 mt-8 p-4 border border-gray-200 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">{golpeSelecionado}</h2>
              <p className="mb-4">{descricaoGolpe.descricao}</p>
              <h3 className="text-xl font-semibold">Exemplos Comuns:</h3>
              <ul className="list-disc list-inside mb-4">
                {descricaoGolpe.exemplos.map((exemplo, index) => (
                  <li key={index}>{exemplo}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold">Como se Proteger:</h3>
              <p>{descricaoGolpe.protecao}</p>
            </div>
          )}
        </div>

        {/* Menu Lateral Fixado à Direita */}
        <MenuLateral />
      </div>
      <Footer />
    </div>
  );
}
