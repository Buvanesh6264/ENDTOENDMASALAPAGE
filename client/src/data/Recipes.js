const recipesData = [
    {
      id: 1,
      name: "Sambar Powder",
      type: "Veg",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/sambar.jpg",
      servings: "5 People",
      time: "20 mins",
      description:
        "Boil 100g dhal with 500 ml of water and keep aside. Heat 3tbsps of refined oil, add 1 tsp of mustard, 100 g sambar onions, 1 sprig of curry leaves and fry till golden brown. Add 100g of cut vegetables of your choice, 50g of chopped tomatoes",
      spiceImage: "https://elephantrunk.in/cdn/shop/products/SAMBAR-POWDER_31c777f1-9c2e-421a-84a3-55a40dc4e925.jpg?v=1585571484",
      detailedRecipe: "Boil 100g dhal with 500 ml of water and keep aside. Heat 3tbsps of refined oil, add 1 tsp of mustard, 100 g sambar onions, 1 sprig of curry leaves and fry till golden brown. Add 100g of cut vegetables of your choice, 50g of chopped tomatoes, 1/2 cup tamarind juice, 25 g of Abhiraa Sambar Powder, salt to taste and cook with pre- boiled dhal for 10-15 minutes. Now garnish with chopped coriander leaves. Tasty Sambar is ready -to- serve."
    },
    {
      id: 2,
      name: "Fish Curry Masala",
      type: "Non-Veg",
      image: "https://vismaifood.com/storage/app/uploads/public/daa/96d/7bc/thumb__700_0_0_0_auto.jpg",
      servings: "10 People",
      time: "30 mins",
      description:
        "Heat 5 tbsp of oil to fry 150 g of onions, 5 cloves of peeled garlic, 1 sprig curry leaves, add 250 g of chopped tomatoes & cook well. Add 50 g of Abhiraa Fish Curry Masala, 400ml of water, 100 g tamarind pulp,",
      spiceImage: "https://www.gohealthyeverafter.com/wp-content/uploads/2022/11/Ingredients-for-Mangalore-fish-curry.jpg",
      detailedRecipe: "Heat 5 tbsp of oil to fry 150 g of onions, 5 cloves of peeled garlic, 1 sprig curry leaves, add 250 g of chopped tomatoes & cook well. Add 50 g of Abhiraa Fish Curry Masala, 400ml of water, 100 g tamarind pulp, 50 g of Coconut paste, 200 ml of water. Add 1kg of fish & quantity of salt. Cook for 10 minutes till the fish cooked. Now Fish Curry is ready to serve hot.",
    },
    {
      id: 3,
      name: "FISH FRY MASALA",
      type: "Non-Veg",
      image: "https://www.kannammacooks.com/wp-content/uploads/masala-fish-fry-recipe-ayala-meen-Mackerel-fry-8.jpg",
      servings: "10 People",
      time: "30 mins",
      description:
        "Make a paste of Abhiraa 50 g Fish Fry Masala with5 tbsp of water and 4 tsp of lemon juice.",
      spiceImage: "https://www.mixuprecipes.com/wp-content/uploads/2024/12/hillbilly-fish-fry-seasonings-recipe.jpg.webp",
      detailedRecipe: "Make a paste of Abhiraa 50 g Fish Fry Masala with5 tbsp of water and 4 tsp of lemon juice. Apply the paste on 1kg of fish pieces. After 2 hours tawa fry the pieces with little refined oil. No need to add salt. Serve hot.",
    },
    {
      id: 4,
      name: "Chilli Chicken 65",
      type: "Non-Veg",
      image: "https://i.ytimg.com/vi/0KdboN6Rkck/maxresdefault.jpg",
      servings: "20 People",
      time: "30 mins",
      description:
        "Cut the 500 g of chicken into 1” cubes and Wash. Marinate the chicken with 1 tbsp of Ginger garlic paste, ½ no lime of juice, 1no beaten egg & 25 g of ABHIRAA CHICKEN 65 masala, mix well and marinade for 1 hour. Heat oil in deep bottom kadai",
      detailedRecipe: "Cut the 500 g of chicken into 1” cubes and Wash. Marinate the chicken with 1 tbsp of Ginger garlic paste, ½ no lime of juice, 1no beaten egg & 25 g of ABHIRAA CHICKEN 65 masala, mix well and marinade for 1 hour. Heat oil in deep bottom kadai, add a few chicken pieces into the oil without crowding the vessel and cook on medium flame. Once the chicken is almost cooked, increase flame and deep fry the chicken pieces till golden brown. Remove onto absorbent paper. Garnish with coriander leaves & serve with onion rings & lime wedges.",
    },
    {
      id: 5,
      name: "Chicken Masala",
      type: "Non-Veg",
      image: "https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-2-3-1.jpg",
      servings: "15 People",
      time: "30 mins",
      description:
        "Wash 500g of chicken pieces and keep aside. Heat 3 tbsps oil to fry chopped 150 g onions until golden brown. Add 200 g of chopped tomatoes and fry until soft. Now add 25g Abhiraa Chicken Masala and cook till oil separates.",
      spiceImage: "https://buyfromkerala.com/wp-content/uploads/2022/10/Kerala-chicken-masala-3.jpg",
      detailedRecipe: "Wash 500g of chicken pieces and keep aside. Heat 3 tbsps oil to fry chopped 150 g onions until golden brown. Add 200 g of chopped tomatoes and fry until soft. Now add 25g Abhiraa Chicken Masala and cook till oil separates. Add 200ml water and salt to taste. Add chicken pieces, cover with lid & allow it to simmer until the chicken becomes tender. Add 50 g coconut paste till the gravy thickens. Now tasty Chicken is ready to serve hot."
    },
    {
      id: 6,
      name: "Mutton Masala",
      type: "Non-Veg",
      image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Mutton-Masala-min.jpg",
      servings: "15 People",
      time: "30 mins",
      description:
        "Wash the mutton pieces thoroughly. Pressure cook 300g of meat with1 tbsp of ginger garlic paste & 100ml of water for up to 3 whistles for about 7minutes. Heat 5 tbsp of oil to fry 100g chopped onions until golden brown.",
      spiceImage: "https://m.media-amazon.com/images/I/51+g7XuFNFL._AC_UF1000,1000_QL80_.jpg",
      detailedRecipe: "Wash the mutton pieces thoroughly. Pressure cook 300g of meat with1 tbsp of ginger garlic paste & 100ml of water for up to 3 whistles for about 7minutes. Heat 5 tbsp of oil to fry 100g chopped onions until golden brown.Add 1 tbsp ginger garlic paste and stir fry for 1 minute. Add chopped 200 g tomatoes & cook until soft. Now add 25g Abhiraa Mutton Masala & cook till the oil separates. Add 200 ml of water & 50 g of coconut paste & cook till the gravy thickens, add salt & the cooked meat. Cook with closed lid until the meat is tasty & tender as per your requirement. Now tasty Mutton Masala is ready to serve hot."
    },
    {
      id: 7,
      name: "Kulambu Masala Powder",
      type: "Veg",
      image: "https://www.yummytummyaarthi.com/wp-content/uploads/2015/04/1-22.jpg",
      servings: "5 People",
      time: "20 mins",
      description:
        "It can be used to prepare Fish curry, Dry fish curry,",
      spiceImage: "https://www.yummytummyaarthi.com/wp-content/uploads/2015/04/IMG_6440.jpg",
      detailedRecipe: "It can be used to prepare Fish curry, Dry fish curry, Egg curry, Tomato curry, Tamarind curry, Kara curry & Fenugreek curry."
    }
  ];

  export default recipesData;