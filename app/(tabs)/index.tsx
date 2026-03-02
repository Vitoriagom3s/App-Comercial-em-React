import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const listaProdutos = [
  {
    id: "1",
    nome: "Vestido Floral",
    preco: 199,
    categoria: "Feminino",
    descricao: "Vestido elegante e confortável.",
    imagem:
      "https://img.ltwebstatic.com/images3_pi/2024/06/25/9c/1719303847a02f0a24ea13c4944eea78a8024967a5_thumbnail_405x.webp",
  },
  {
    id: "2",
    nome: "Saia Verão",
    preco: 80,
    categoria: "Feminino",
    descricao: "Saia elegante e confortável para dias quentes.",
    imagem:
      "https://acdn-us.mitiendanube.com/stores/002/717/537/products/facetune_27-06-2022-13-42-15-215978da4995ecd8f317087190508733-1024-1024.jpeg",
  },
  {
    id: "3",
    nome: "Kit Calcinha",
    preco: 25,
    categoria: "Feminino",
    descricao: "Calcinha confortável para dias de calor.",
    imagem:
      "https://bankapanka.cdn.magazord.com.br/img/2023/03/produto/9039/kit-3-calcinhas-rendada-fio-dental-basica-b.jpg?ims=700x1000",
  },
  {
    id: "4",
    nome: "Camisa Social",
    preco: 130,
    categoria: "Masculino",
    descricao: "Camisa social moderna.",
    imagem:
      "https://www.chrisdecor.com.br/861-large_default_2x/camisa-social-masculina-manga-curta.jpg",
  },
  {
    id: "5",
    nome: "Cueca Box",
    preco: 30,
    categoria: "Masculino",
    descricao: "Cueca box para conforto no dia a dia.",
    imagem:
      "https://www.katy.com.br/cdn/imagens/produtos/det/cueca-boxer-lupo-microfibra--304d7629fcdb03ac2f606ab215109388.jpg",
  },
  {
    id: "6",
    nome: "Regata Masculina",
    preco: 50,
    categoria: "Masculino",
    descricao: "Regata moderna para estilo casual.",
    imagem:
      "https://static.ecosweb.com.br/public/produtos/mkp43/moda-masculina/camiseta/camiseta-masculina-regata-preto-00004-preta_2050006_301_1.webp",
  },
  {
    id: "7",
    nome: "Colar Brilhante",
    preco: 179,
    categoria: "Acessórios",
    descricao: "Colar brilhante para agregar valor ao look.",
    imagem:
      "https://m.media-amazon.com/images/I/719hLYXmpxL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "8",
    nome: "Pulseira Elegante",
    preco: 100,
    categoria: "Acessórios",
    descricao: "Pulseira sofisticada e moderna.",
    imagem:
      "https://images.tcdn.com.br/img/img_prod/1182133/pulseira_feminina_prata_925_trevo_rosa_1_20250922160933_ea8e9460e8e8.jpg",
  },
  {
    id: "9",
    nome: "Anel Luxo",
    preco: 179,
    categoria: "Acessórios",
    descricao: "Anel elegante para ocasiões especiais.",
    imagem:
      "https://cdn.awsli.com.br/300x300/1637/1637890/produto/375089092/a96df4bc-a167-4baa-a872-f8a7a1f6ccc9-3se0mj92jj.jpg",
  },
  {
    id: "10",
    nome: "Tênis Esportivo",
    preco: 299,
    categoria: "Tênis",
    descricao: "Conforto e performance.",
    imagem:
      "https://mimostock.com/cdn/shop/files/Sa1b38e23a0da4fa3b87df6c7292541bbC_800x.webp?v=1735829577",
  },
  {
    id: "11",
    nome: "Tênis Casual",
    preco: 299,
    categoria: "Tênis",
    descricao: "Ideal para o dia a dia.",
    imagem:
      "https://a-static.mlcdn.com.br/420x420/tensi-mormaii-urban-free-jr-ref-205015-masculino/mdfshopartigosesportivoseparaola/13084/36674e58649cdc256e57ce8ab0c65fea.jpeg",
  },
];

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [categoria, setCategoria] = useState("Todos");
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [tamanho, setTamanho] = useState("M");
  const [quantidade, setQuantidade] = useState(1);
  const [modalPagamento, setModalPagamento] = useState(false);
  const [tipoPagamento, setTipoPagamento] = useState("");
 const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
 
  useEffect(() => {
    carregarCarrinho();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  async function carregarCarrinho() {
    const dados = await AsyncStorage.getItem("carrinho");
    if (dados) setCarrinho(JSON.parse(dados));
  }

  function login() {
    if (!email || !senha) {
      Alert.alert("Preencha os campos");
      return;
    }
    setUsuarioLogado(true);
  }

  function adicionarCarrinho() {
    const novoItem = {
      ...produtoSelecionado,
      tamanho,
      quantidade,
    };
    setCarrinho([...carrinho, novoItem]);
    setProdutoSelecionado(null);
    setQuantidade(1);
    Alert.alert("Adicionado ao carrinho!");
  }
 function removerDoCarrinho(index: number) {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
}
  function toggleFavorito(produto: any) {
    const existe = favoritos.find((f) => f.id === produto.id);
    if (existe) {
      setFavoritos(favoritos.filter((f) => f.id !== produto.id));
    } else {
      setFavoritos([...favoritos, produto]);
    }
  }

 const total = carrinho.reduce((sum, item) => {
  const preco = Number(item.preco) || 0;
  const quantidade = Number(item.quantidade) || 1;
  return sum + preco * quantidade;
}, 0);

  const produtosFiltrados =
    categoria === "Todos"
      ? listaProdutos
      : listaProdutos.filter((p) => p.categoria === categoria);

  if (!usuarioLogado) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.titulo}>Fashion Store</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.botao} onPress={login}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (produtoSelecionado) {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: produtoSelecionado.imagem }}
          style={styles.imagemGrande}
        />
        <Text style={styles.nome}>{produtoSelecionado.nome}</Text>
        <Text style={styles.preco}>R$ {produtoSelecionado.preco}</Text>
        <Text>{produtoSelecionado.descricao}</Text>

        <Text style={{ marginTop: 15 }}>Tamanho:</Text>
        <View style={{ flexDirection: "row" }}>
          {["PP", "P", "M", "G", "GG"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.tamanhoBtn,
                tamanho === t && styles.tamanhoAtivo,
              ]}
              onPress={() => setTamanho(t)}
            >
              <Text>{t}</Text>
            </TouchableOpacity>
            
          ))}
        </View>

        <Text style={{ marginTop: 15 }}>Quantidade:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
          >
            <Text style={styles.qtdBtn}>-</Text>
          </TouchableOpacity>
          <Text>{quantidade}</Text>
          <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
            <Text style={styles.qtdBtn}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={adicionarCarrinho}>
          <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setProdutoSelecionado(null)}>
          <Text style={{ marginTop: 20 }}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛍️ Fashion Store</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {["Todos", "Feminino", "Masculino", "Acessórios", "Tênis"].map(
          (cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaBtn,
                categoria === cat && styles.categoriaAtiva,
              ]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={{ color: "white" }}>{cat}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagemContainer}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />

              <TouchableOpacity
                style={styles.botaoFavorito}
                onPress={() => toggleFavorito(item)}
              >
                <Text style={styles.coracao}>
                  {favoritos.find((f) => f.id === item.id)
                    ? "❤️"
                    : "🤍"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setProdutoSelecionado(item)}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() => setModalPagamento(true)}
      >
        <Text style={styles.botaoTexto}>
          Carrinho ({carrinho.length}) - R$ {total}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalPagamento} animationType="slide">
  <View style={styles.container}>
    <Text style={styles.titulo}>Pagamento</Text>

    {/* LISTA DO CARRINHO */}
    <FlatList
      data={carrinho}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
            <Text>
              {item.quantidade}x - R$ {item.preco}
            </Text>
          </View>

          <TouchableOpacity onPress={() => removerDoCarrinho(index)}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Remover
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />

    {/* TOTAL */}
    <Text
      style={{
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#5737d6",
      }}
    >
      Total: R$ {total.toFixed(2)}
    </Text>

    <TouchableOpacity
      style={styles.botao}
      onPress={() => setTipoPagamento("pix")}
    >
      <Text style={styles.botaoTexto}>PIX</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.botao}
      onPress={() => setTipoPagamento("cartao")}
    >
      <Text style={styles.botaoTexto}>Cartão</Text>
    </TouchableOpacity>

    {tipoPagamento === "pix" && (
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <QRCode value={`Total R$ ${total.toFixed(2)}`} size={220} />
        <Text
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: "bold",
            color: "#5737d6",
          }}
        >
          Total: R$ {total.toFixed(2)}
        </Text>
      </View>
    )}

    {tipoPagamento === "cartao" && (
      <>
        <TextInput style={styles.input} placeholder="Nome no cartão" />
        <TextInput style={styles.input} placeholder="Número do cartão" />
        <TextInput style={styles.input} placeholder="CVV" />
        <TextInput style={styles.input} placeholder="Validade" />
        <TouchableOpacity
          style={styles.botao}
          onPress={() => Alert.alert("Pagamento aprovado!")}
        >
          <Text style={styles.botaoTexto}>Confirmar</Text>
        </TouchableOpacity>
      </>
    )}

    <TouchableOpacity
      onPress={() => setModalPagamento(false)}
      style={{
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 10,
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", color: "#cf0202" }}>
        ✕
      </Text>
    </TouchableOpacity>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#a0b8e2" },
  loginContainer: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#546583" },
  titulo: { fontSize: 35, fontWeight: "bold", textAlign: "center",  color: "#7b93da", marginBottom: 15 },
  card: { backgroundColor: "white", padding: 15, borderRadius: 15, marginBottom: 10 },
  imagem: { height: 120, borderRadius: 10 },
  imagemGrande: { height: 300, borderRadius: 15 },
  nome: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  preco: { color: "#6020c7" },
  botao: { backgroundColor: "#423c5c", padding: 12, borderRadius: 10, marginTop: 10, alignItems: "center" },
  botaoTexto: { color: "white", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#191616", padding: 10, borderRadius: 10, marginTop: 10 },
  categoriaBtn: { backgroundColor: "#484278", padding: 8, borderRadius: 20, marginRight: 10 },
  categoriaAtiva: { backgroundColor: "#9289e4" },
  botaoCarrinho: { backgroundColor: "#484278", padding: 15, borderRadius: 15, marginTop: 10 },
  tamanhoBtn: { padding: 10, borderWidth: 1, marginRight: 5, borderRadius: 5 },
  tamanhoAtivo: { backgroundColor: "#7c58cf" },
  qtdBtn: { fontSize: 25, padding: 10 },
  coracao: { position: "absolute", right: 10, fontSize: 20, zIndex: 1 },imagemContainer: {
  position: "relative",
},

botaoFavorito: {
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 10,
},
});