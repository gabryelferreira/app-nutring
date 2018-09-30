export interface ILogin {
    email: string
    password: string
}

export interface IFood {
    id_prato_feito?: number
    nome?: string
    acucares?: number
    calcio?: number
    carboidratos?: number
    colesterol?: number
    ferro?: number
    fibra?: number
    gordura_saturada?: number
    gordura_trans?: number
    kcal?: number
    proteina?: number
    quantidade?: number
    sodio?: number
    vitamina_a?: number
    vitamina_c?: number
}

export interface IUser {
    id_usuario?: number
    nome?: string
    sobrenome?: string
    dt_nasc?: string
    sexo?: string
    email?: string
    usuario?: string
    peso_kg?: string
    altura_m?: string
    foto?: string
    cep?: string
    telefone?: string
    senha?: string
}

export interface IFoodApi {
    food_name?: string
    brand_name?: string
    serving_qty?: number
    serving_unit?: number
    serving_weight_grams?: number
    nf_calories?: number
    nf_total_fat?: number
    nf_saturated_fat?: number
    nf_cholesterol?: number
    nf_sodium?: number
    nf_total_carbohydrate?: number
    nf_dietary_fiber?: number
    nf_sugars?: number
    nf_protein?: number
    nf_potassium?: number
    nf_p?: number
}

export interface IPost {
    id_post?: number
    id_usuario?: number
    nome?: string
    hora?: string
    foto?: string
    post?: string
    curtidas?: number
    descricao?: string
    comentarios?: number
    gostei?: boolean
}

export interface IPostComments {
    id_comment?: number,
    nome: string,
    foto: string,
    hora: string,
    comentario: string,
    gostei: boolean,
    curtidas: number
}