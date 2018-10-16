export interface ILogin {
  email: string;
  password: string;
}

export interface IFood {
  id_alimento?: number;
  nome?: string;
  kcal?: number;
  proteina?: number;
  lipideos?: number;
  carboidrato?: number;
  fibra_alimentar?: number;
  cinzas?: number;
  calcio?: number;
  magnesio?: number;
  manganes?: number;
  fosforo?: number;
  ferro?: number;
  sodio?: number;
  potassio?: number;
  cobre?: number;
  zinco?: number;
  vitamina_c?: number;
  img_url?: string;
  quantidade?: number;
  cd_grupo_alimentar?: any;
}

export interface IUser {
  id_usuario?: number;
  nome?: string;
  sobrenome?: string;
  dt_nasc?: string;
  sexo?: string;
  email?: string;
  usuario?: string;
  peso_kg?: string;
  altura_m?: string;
  foto?: string;
  cep?: string;
  telefone?: string;
  senha?: string;
}

export interface IFoodApi {
  food_name?: string;
  brand_name?: string;
  serving_qty?: number;
  serving_unit?: number;
  serving_weight_grams?: number;
  nf_calories?: number;
  nf_total_fat?: number;
  nf_saturated_fat?: number;
  nf_cholesterol?: number;
  nf_sodium?: number;
  nf_total_carbohydrate?: number;
  nf_dietary_fiber?: number;
  nf_sugars?: number;
  nf_protein?: number;
  nf_potassium?: number;
  nf_p?: number;
}

export interface IPost {
  id_post?: number;
  id_usuario?: number;
  nome?: string;
  hora?: string;
  foto?: string;
  post?: string;
  curtidas?: number;
  descricao?: string;
  comentarios?: number;
  gostei?: boolean;
  actualComment?: string;
}

export interface IPostComment {
  id_comentario?: number;
  id_usuario?: number;
  nome?: string;
  foto?: string;
  hora?: string;
  comentario?: string;
  gostei?: boolean;
  curtidas?: number;
  selecionado?: boolean;
}
