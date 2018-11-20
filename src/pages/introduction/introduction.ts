import { TabsPage } from "./../tabs/tabs";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the IntroductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-introduction",
  templateUrl: "introduction.html"
})
export class IntroductionPage {
  slides = [
    {
      title: "Monte seus pratos e controle diariamente as calorias ingeridas.",
      description:
        "Não há melhor investimento do que aquele que você faz em prol da sua saúde, não é mesmo? É isso que fazemos aqui na Nutring.",
      image: "assets/imgs/intro1.png"
    },
    {
      title: "Nós mostramos gráficos e estatísticas precisas de acordo com o seu objetivo.",
      description:
        "Tudo para o seu bem estar e para potencializar a sua qualidade de vida. Estamos pensando em você, a mudança começa agora!",
      image: "assets/imgs/intro2.png"
    },
    {
      title: "Contabilizando as calorias, fica mais fácil de você saber o que está consumindo.",
      description:
        "Temos um banco de dados com milhares de alimentos, todos com suas devidas informações nutricionais. Mostramos tudo que você precisa saber!",
      image: "assets/imgs/intro3.png"
    },
    {
      title: "Vamos começar?",
      description:
        "Agora que você já sabe as funções do Nutring, aproveite e entre em um estilo de vida que você jamais irá voltar ao que era antes.",
      image: "assets/imgs/intro4.png"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  closeIntroduction() {
    var storage = localStorage.getItem("userData");
    storage = JSON.parse(storage);
    storage["acessos"] = storage["acessos"] + 1;
    localStorage.setItem("userData", JSON.stringify(storage));
    this.navCtrl.push(TabsPage);
  }
}
