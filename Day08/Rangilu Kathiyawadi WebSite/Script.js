/* Rangilu Kathiyawad - Dynamic Shop Engine */

// --- Exhaustive Kathiyawadi Menu Database ---
const MENU_ITEMS = [
    // 1. Sakal No Nasto (Breakfast)
    {
        id: "nas-1",
        name: "Vanela Gathiya",
        category: "breakfast",
        price: 80,
        rating: 4.9,
        reviews: 412,
        image: "https://b.zmtcdn.com/data/dish_photos/66b/8f866006cf2ffd6004c31e881e76f66b.png?output-format=webp",
        description: "Hand-rolled, soft yet crunchy spiced gram flour snacks. Saurashtra's staple morning delight."
    },
    {
        id: "nas-2",
        name: "Fafda Jalebi Combo",
        category: "breakfast",
        price: 130,
        rating: 4.9,
        reviews: 589,
        image: "https://as1.ftcdn.net/v2/jpg/20/11/51/34/1000_F_2011513427_vxvDhUkc4j4bl9nh4dK5a7l861HHLOkh.jpg",
        description: "Crisp, flat gram flour strips paired with hot, syrup-dripping golden jalebis and raw papaya sambharo."
    },
    {
        id: "nas-3",
        name: "Khaman / Spongy Dhokla",
        category: "breakfast",
        price: 70,
        rating: 4.8,
        reviews: 320,
        image: "https://as2.ftcdn.net/v2/jpg/08/64/10/57/1000_F_864105761_lluTE6RowITC74uSVjSN28IIauNN9yOk.jpg",
        description: "Steamed, cloud-soft lentil cakes tempered heavily with mustard seeds, sesame, and green chilies."
    },
    {
        id: "nas-4",
        name: "Sev khamani",
        category: "breakfast",
        price: 60,
        rating: 4.7,
        reviews: 145,
        image: "https://media.istockphoto.com/id/2165738897/photo/sev-khamani.jpg?s=612x612&w=0&k=20&c=le7uNwFAG0GO5WnJwtg0CQbnmxai9Ss9I_LCiIiFteY=",
        description: "Light, flattened rice flakes tossed with turmeric, soft boiled potatoes, roasted peanuts, and crispy sev."
    },
    {
        id: "nas-5",
        name: "Methi Thepla (4 Pcs)",
        category: "breakfast",
        price: 80,
        rating: 4.9,
        reviews: 489,
        image: "https://as1.ftcdn.net/v2/jpg/10/65/45/18/1000_F_1065451828_EH91s4qJuxQGQaLeTGKL9GhyK3mcPu6o.jpg",
        description: "Iconic flatbreads prepared with whole wheat, gram flour, fresh fenugreek leaves, and rustic spices."
    },
    {
        id: "nas-6",
        name: "Masala Chaa",
        category: "breakfast",
        price: 80,
        rating: 4.9,
        reviews: 489,
        image: "https://t4.ftcdn.net/jpg/09/11/95/53/240_F_911955321_CXUGBnRFF6oBY3YHldxk5uiT7NAZc5nI.jpg",
        description: "a rich, comforting, and aromatic blend of black tea, creamy milk, and a fragrant medley of warming spices. The traditional recipe usually includes a combination of ginger, cardamom, cloves, cinnamon, and black pepper, slowly simmered to perfection"
    },

    // 2. Starters & Farsan (Appetizers & Snacks)
    {
        id: "sta-1",
        name: "Vagharelo Rotlo",
        category: "starters",
        price: 140,
        rating: 4.9,
        reviews: 345,
        image: "https://imgs.search.brave.com/f6NfvNn7WkGsuaF5hDY8ztO0ujWW-xNzeEcKpRMU_Wo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWdo/bmFzZm9vZG1hZ2lj/LmluL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI1LzAxL0RTQzAy/MDg0LTczMngxMzAw/LmpwZw",
        description: "Crumbled Bajra bread tossed in a heavy traditional tempering of sour curd, dynamic garlic, and mustard seeds."
    },
    {
        id: "sta-2",
        name: "Lasaniya Bataka",
        category: "starters",
        price: 110,
        rating: 4.8,
        reviews: 298,
        image: "https://imgs.search.brave.com/ETkrmFXMgwAq281bjbldXItOQ5lFndvdtTqQVGjglrg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vYmluamFs/c3ZlZ2tpdGNoZW4u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzAxL0xhc2Fu/aXlhLUJodW5nbGEt/QmF0YXRhLUwxLmpw/Zz9yZXNpemU9NjAw/LDkwMCZzc2w9MQ",
        description: "Fiery, dry baby potatoes completely coated in a thick, pungent red garlic and red chili paste."
    },
    {
        id: "sta-3",
        name: "Dahi Tikhari",
        category: "starters",
        price: 100,
        rating: 4.7,
        reviews: 189,
        image: "https://gujaratieats.com/wp-content/uploads/2025/08/dahi-tikhari-scaled.jpg",
        description: "A rich, spicy traditional dip made by tempering thick curd with high-intensity garlic and chili oils."
    },
    {
        id: "sta-4",
        name: "Bhajiya",
        category: "starters",
        price: 90,
        rating: 4.8,
        reviews: 267,
        image: "https://imgs.search.brave.com/2nxYagtQBtWZBCCmtJ4Wv0JLWkaat4YOQLYx1otJpZM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amNvb2tpbmdvZHlz/c2V5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wOS9n/dWphcmF0aS1tZXRo/aS1nb3RhLmpwZw",
        description: "Deep-fried, ultra-soft fresh fenugreek leaf dumplings. Crispy exterior with a warm, fluffy heart."
    },
    {
        id: "sta-5",
        name: "Kanda Na Bhajiya",
        category: "starters",
        price: 80,
        rating: 4.6,
        reviews: 154,
        image: "https://as2.ftcdn.net/v2/jpg/06/97/12/69/1000_F_697126933_IaPRzO9H5FjEPrYxpDUdF0B6ZFvlHuEc.jpg",
        description: "Crispy, double-fried thinly sliced onion fritters seasoned with cracked black pepper and ajwain."
    },
    {
        id: "sta-6",
        name: "Tamatariya (Fritters)",
        category: "starters",
        price: 95,
        rating: 4.5,
        reviews: 98,
        image: "https://imgs.search.brave.com/fckyu7OvcBMEQzkzRKFWkKfrIhQoox8hY4CKDSo70eM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXN0/YXVyYW50aW5kaWEu/czMuYXAtc291dGgt/MS5hbWF6b25hd3Mu/Y29tL3MzZnMtcHVi/bGljL2lubGluZS1p/bWFnZXMvMTIuJTIw/R3JlZWNlXyUyMFRv/bWF0b2tlZnRlZGVz/LmpwZw",
        description: "Unique, deep-fried stuffed tomatoes or tomato-infused gram flour batter fritters with sweet-sour chutneys."
    },

    // 3. Kathiyawadi Shaak (Main Course Curries)
    {
        id: "shk-1",
        name: "Ringan No Oro",
        category: "shaak",
        price: 180,
        rating: 5.0,
        reviews: 823,
        image: "https://imgs.search.brave.com/eIhIVRWGH6bbyKpQWfJrRPaGCCa9nQR03_PQER9XjLE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amNvb2tpbmdvZHlz/c2V5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wMi9k/YWhpLXZhcm8tb3Jv/LmpwZw",
        description: "Ultimate legend. Slow coal-roasted eggplant mash cooked with green spring onions, ginger, and loads of garlic."
    },
    {
        id: "shk-2",
        name: "Sev Tameta Nu Shaak",
        category: "shaak",
        price: 150,
        rating: 4.9,
        reviews: 645,
        image: "https://i.pinimg.com/736x/67/ef/ae/67efae2daa5ac742f72bec477c454b46.jpg",
        description: "Sweet, sour, and intensely spicy tomato curry cooked with garlic, topped with thick crispy nylon sev."
    },
    {
        id: "shk-3",
        name: "Bharela Ringan Bataka",
        category: "shaak",
        price: 160,
        rating: 4.8,
        reviews: 412,
        image: "https://imgs.search.brave.com/4CTi33DLPUMvD2kg1smqY0csUngnsjk58Pv5neKN6u8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGV3/aGlza2FkZGljdC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDIvSU1HXzcy/OTAtMS0xMDI0eDk5/Ni5qcGc",
        description: "Baby eggplants and potatoes slit and stuffed with a rich, toasted peanut, coconut, and garlic masala."
    },
    {
        id: "shk-4",
        name: "Ganthiya Nu Shaak",
        category: "shaak",
        price: 140,
        rating: 4.7,
        reviews: 178,
        image: "https://imgs.search.brave.com/E7wX__4WSwbqxScXtFf3NqS7N78x17QPL0d91UP55jA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96YXRw/YXRyZWNpcGVpbmd1/amFyYXRpLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/Ni9nYXRoaXlhLW51/LXNoYWFrLTY5Nngz/OTIuanBn",
        description: "A rural delicacy where thick, spicy Bhavnagari gathiya is simmered gently in a robust spiced yogurt-buttermilk gravy."
    },
    {
        id: "shk-5",
        name: "Kaju Karela Nu Shaak",
        category: "shaak",
        price: 170,
        rating: 4.6,
        reviews: 134,
        image: "https://imgs.search.brave.com/1KofVKD1NkFJTg0uMA4ytITUM121T_IvEHoL7LL3OJU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LmJs/aXNzb2Zjb29raW5n/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxNy8wNi9LYXJl/bGEtS2FqdS1FT1Au/anBnP3Jlc2l6ZT03/NDAsNDkzJnNzbD0x",
        description: "Crispy-fried bitter gourd cooked with crunchy whole cashews, tangy tamarind, and sweet organic jaggery."
    },
    {
        id: "shk-6",
        name: "Bataka Rasawala Shaak",
        category: "shaak",
        price: 120,
        rating: 4.7,
        reviews: 219,
        image: "https://imgs.search.brave.com/OZL25vdVbkVxdeb17GhSpAT42u1RxUnPxzVM-M_5nHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29va2luZ2Nhcm5p/dmFsLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNS8wNy9C/YXRldGEtTnUtcmFz/YXZhbHUtU2hhYWsu/anBn",
        description: "Comforting, spicy potato curry in a thin, seasoned tomato-water gravy, heavily infused with cumin seeds."
    },
    {
        id: "shk-7",
        name: "Guvar Nu Shaak",
        category: "shaak",
        price: 130,
        rating: 4.5,
        reviews: 87,
        image: "https://imgs.search.brave.com/EBB-VfMWxuWBSX0HnLDzhG6JqBqBYgpktufv83NN4j8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96YXRw/YXRyZWNpcGVpbmd1/amFyYXRpLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/NS9ndXZhci1udS1z/aGFhay1iYW5hdmFu/aS1yaXQtNjk2eDM5/Mi5qcGc",
        description: "Fresh cluster beans dry-cooked with carom seeds (ajwain), grated coconut, and a heavy garlic paste."
    },
    {
        id: "shk-8",
        name: "Vagharela Chana",
        category: "shaak",
        price: 110,
        rating: 4.8,
        reviews: 154,
        image: "https://imgs.search.brave.com/xXOlhMOw4MzWPM4BYRTYRvzwz00kuqbZ67KR7rSSYvs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzAy/MDEvMTcyMC9maWxl/cy9JTUctNjY3NV9k/YzlkNzQ4Yi0xMDU0/LTRmNjItYmRkYy02/NjE4YzAyYjc4MDZf/NjAweDYwMC5qcGc_/dj0xNzM3MDU2MjE1",
        description: "High-protein black chickpeas boiled and dry-tempered in mustard oil, green chilies, and fiery garlic paste."
    },
    {
        id: "shk-9",
        name: "Mag Nu Shaak",
        category: "shaak",
        price: 120,
        rating: 4.7,
        reviews: 132,
        image: "https://imgs.search.brave.com/BZuN-pnCT8Mr_bnvwuGK0M0dvTQVHtfAUpDpcUUSaxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92c3Bp/Y2Vyb3V0ZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDkvNjQ2MTBDMDEt/OTAyNy00QzRGLThC/MTktREVFQ0Y4OUUy/OTA4LTUwMHg1MDAu/anBlZw",
        description: "Whole green moong beans cooked in a nutritious, mild but fragrant home-style Gujarati thin gravy."
    },
    {
        id: "shk-10",
        name: "Rasawala Chavali",
        category: "shaak",
        price: 125,
        rating: 4.6,
        reviews: 94,
        image: "https://imgs.search.brave.com/BZuN-pnCT8Mr_bnvwuGK0M0dvTQVHtfAUpDpcUUSaxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92c3Bp/Y2Vyb3V0ZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDkvNjQ2MTBDMDEt/OTAyNy00QzRGLThC/MTktREVFQ0Y4OUUy/OTA4LTUwMHg1MDAu/anBlZw",
        description: "Soft black-eyed peas prepared in a rich, slow-simmered spicy thin gravy with hints of dried ginger."
    },

    // 4. Rotla & Bhakri (Breads)
    {
        id: "rot-1",
        name: "Bajra No Rotlo (Desi Ghee)",
        category: "rotla",
        price: 50,
        rating: 5.0,
        reviews: 912,
        image: "https://imgs.search.brave.com/K9qchtBQJj2DPfveZkFpubWTEFUdMvs1wvF_UxsYxME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVjaXBlaW5ndWph/cmF0aS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMTEv/am93YXItbmEtcm90/bGEtYmFuYXZhbmkt/cml0LTY5NngzOTIu/anBn",
        description: "Thick, rustic pearl millet flatbread hand-patted and baked on a clay tavdi. Served smeared with fresh white butter."
    },
    {
        id: "rot-2",
        name: "Makai No Rotlo",
        category: "rotla",
        price: 45,
        rating: 4.8,
        reviews: 212,
        image: "https://imgs.search.brave.com/J-b68GsI5dWjK-aGYkFcl_xtkXUtBiYJS6-Jlutsh1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGFybGFkYWxhbC5j/b20vbWVkaWEvcmVj/aXBlL21haW5waG90/by8yMDI1LzAyLzA4/L2JpZ19tb29saV9t/YWthaV9raV9yb3Rp/LTExODg2LndlYnA",
        description: "Soft, thick, health-friendly sorghum flatbread hand-pressed and slow-cooked over a mild wood fire."
    },
    {
        id: "rot-3",
        name: "Biscuit Bhakri (2 Pcs)",
        category: "rotla",
        price: 60,
        rating: 4.9,
        reviews: 432,
        image: "https://i0.wp.com/mayuris-jikoni.com/wp-content/uploads/2018/08/bhakri-4.jpg?resize=480%2C640&ssl=1",
        description: "Extra thick, slow-roasted crispy whole wheat flatbread. Unbelievably flaky, melt-in-your-mouth texture."
    },
    {
        id: "rot-4",
        name: "Pad Vali Rotli (3 Pcs)",
        category: "rotla",
        price: 50,
        rating: 4.9,
        reviews: 387,
        image: "https://www.jcookingodyssey.com/wp-content/uploads/2012/05/Padvali-Roti-2-Layered-Bepadi-Rotli.jpg",
        description: "Tissue-thin, multi-layered delicate wheat rotis folded gently and brushed generously with hot organic cow ghee."
    },
    {
        id: "rot-5",
        name: "Satpadi Parotha (2 Pcs)",
        category: "rotla",
        price: 70,
        rating: 4.8,
        reviews: 198,
        image: "https://imgs.search.brave.com/gxeiO69VvXu0EPHxYwo4HqDfPZdOfepXLK-M1MkX8aI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc2/Mjk0NTcxL3Bob3Rv/L2luZGlhbi1mb29k/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1VQWNaMTFvUEli/bndYLUJ6UnhLYUdo/djdvVWZGVC02dldE/bHZJbjAxblFzPQ",
        description: "Aromatic, multi-layered flaky flatbread infused with seven distinct ground spices including turmeric and ajwain."
    },

    // 5. Rice & Khichdi (Rice Zone)
    {
        id: "ric-1",
        name: "Vaghareli Khichdi",
        category: "rice",
        price: 160,
        rating: 5.0,
        reviews: 654,
        image: "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2015/09/Vaghareli-Khichdi-L2-1.jpg?resize=600%2C840&ssl=1",
        description: "Rice and yellow lentils pressure-cooked with fresh greens, heavily tempered in cow ghee with cloves, garlic, and cumin."
    },
    {
        id: "ric-2",
        name: "Pure Desi Ghee-Khichdi",
        category: "rice",
        price: 150,
        rating: 4.9,
        reviews: 312,
        image: "https://imgs.search.brave.com/14mP4Df64TEYe6zFkrGaZo7vIEM6pciFDG3G75x0VnI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly84OHB3/ZGF3NDR1LnVmcy5z/aC9mLzNtUnc5OGJZ/T3c4bUw5RUc5RnBk/RTZTaHhsZ25DaTM1/cVZIWk9XTVBKdnow/SXdYRg",
        description: "Soft, comforting classic plain yellow khichdi served swimming in a generous pool of piping hot melted cow ghee."
    },
    {
        id: "ric-3",
        name: "Vagharelo Bhaat",
        category: "rice",
        price: 130,
        rating: 4.7,
        reviews: 124,
        image: "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2025/08/Gujarati-Vagharelo-Bhaat-L2.jpg?resize=600%2C900&ssl=1",
        description: "Pan-fried rice seasoned with mustard seeds, curry leaves, turmeric, roasted peanuts, and a splash of sour buttermilk."
    },
    {
        id: "ric-4",
        name: "Royal Rajwadi Pulao",
        category: "rice",
        price: 180,
        rating: 4.8,
        reviews: 219,
        image: "https://naturallynidhi.com/wp-content/uploads/2024/10/Jodhpuri-Kabuli-Pulao-Rajasthani-Biryani-Cover.jpg",
        description: "Richly aromatic basmati rice cooked with fresh saffron strands, garden vegetables, fried cashews, and raisins."
    },

    // 6. Mithai (Sweets)
    {
        id: "swt-1",
        name: "Gor No Lado (2 Pcs)",
        category: "sweets",
        price: 100,
        rating: 4.9,
        reviews: 345,
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/gond-ke-laddu.jpg",
        description: "Traditional coarsely ground wheat flour ladoos sweetened with dark, organic jaggery and loaded with warm ghee."
    },
    {
        id: "swt-2",
        name: "Royal Churma Ladoo (2 Pcs)",
        category: "sweets",
        price: 110,
        rating: 5.0,
        reviews: 532,
        image: "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2016/03/Churma-Ladoo-H1-1.jpg?fit=600%2C900&ssl=1",
        description: "Fried wheat flour dumplings ground and blended with premium almonds, poppy seeds, dark jaggery, and dense ghee."
    },
    {
        id: "swt-3",
        name: "Organic Sukhdi",
        category: "sweets",
        price: 100,
        rating: 4.9,
        reviews: 476,
        image: "https://www.cookingcarnival.com/wp-content/uploads/2020/10/Sukhadi.jpg",
        description: "Quick, melt-in-the-mouth soft fudge made of whole wheat, ghee, and hot melted jaggery. Set flat and sliced into diamonds."
    },
    {
        id: "swt-4",
        name: "Sheera",
        category: "sweets",
        price: 120,
        rating: 4.8,
        reviews: 143,
        image: "https://thewhiskaddict.com/wp-content/uploads/2024/10/IMG_0974-scaled.jpg",
        description: "A classic Indian semolina pudding made by roasting fine wheat grains in rich clarified butter. Sweetened and gently infused with aromatic cardamom, saffron, and toasted nuts, it offers a soft, fluffy, and melt-in-the-mouth texture."
    },
    {
        id: "swt-5",
        name: "Kesar Pista Shrikhand",
        category: "sweets",
        price: 90,
        rating: 4.9,
        reviews: 398,
        image: "https://5.imimg.com/data5/ANDROID/Default/2024/9/450500361/CZ/GW/EY/84808594/product-jpeg-500x500.jpg",
        description: "Thick, silky hung yogurt dessert flavored with pure Kashmiri saffron, crushed green cardamom, and raw pistachios."
    },
    {
        id: "swt-6",
        name: "Traditional Doodh Pak",
        category: "sweets",
        price: 95,
        rating: 4.7,
        reviews: 187,
        image: "https://www.cookwithkushi.com/wp-content/uploads/2024/10/doodh_pak_indian_rice_pudding_dessert.jpg  ",
        description: "Slow-reduced, creamy milk pudding brewed with basmati grains, saffron, slivered almonds, and charoli seeds."
    },

    // 7. Accompaniments & Sides (Sides)
    {
        id: "sid-1",
        name: "Spiced Masala Chhas",
        category: "sides",
        price: 30,
        rating: 5.0,
        reviews: 843,
        image: "https://www.cookwithmanali.com/masala-chaas/masala-chaas-recipe/",
        description: "Chilled, lightweight buttermilk churned with roasted cumin powder, black salt, fresh mint, and coriander."
    },
    {
        id: "sid-2",
        name: "Gor-Ghe",
        category: "sides",
        price: 40,
        rating: 4.9,
        reviews: 219,
        image: "https://static.punjabkesari.in/multimedia/2021_10image_14_52_191107536health1-ll.jpg",
        description: "A traditional essential block of raw local jaggery served side-by-side with a bowl of warm, liquid cow ghee."
    },
    {
        id: "sid-3",
        name: "Lasaniyan Marcha / Chutney",
        category: "sides",
        price: 20,
        rating: 4.9,
        reviews: 567,
        image: "https://vegecravings.com/wp-content/uploads/2023/08/Rajasthani-Garlic-Chutney-Recipe-Step-By-Step-Instructions.jpg",
        description: "Super fiery, dynamic rustic red garlic paste pounded with dry Kashmiri red chilies and lime juice."
    },
    {
        id: "sid-4",
        name: "Pickled Athela Marcha",
        category: "sides",
        price: 25,
        rating: 4.8,
        reviews: 198,
        image: "https://maayeka.com/wp-content/uploads/2018/09/raita-mircha-athela-marcha.jpg.webp",
        description: "Fresh green serrano chilies pickled briefly in yellow mustard seeds, split fenugreek, oil, and salt."
    },
    {
        id: "sid-5",
        name: "Crunchy Kachumber Salad",
        category: "sides",
        price: 40,
        rating: 4.6,
        reviews: 110,
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/kachumber-salad.jpg",
        description: "A crisp, raw salad of finely chopped onions, cucumbers, tomatoes, and cilantro tossed in chat masala and lime."
    },
];

// --- State Variables ---
let cart = [];
let activeCategory = "all";
let searchTerm = "";
let sortBy = "default";

// --- DOM References ---
const DOM = {
    navbar: document.querySelector('.navbar'),
    menuGrid: document.getElementById('menu-grid'),
    categoryFilters: document.getElementById('category-filters'),
    searchInput: document.getElementById('menu-search'),
    sortSelect: document.getElementById('menu-sort'),
    
    // Cart Controls
    cartBtn: document.getElementById('cart-btn'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartCountBadge: document.getElementById('cart-count'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    emptyCartMessage: document.getElementById('empty-cart'),
    cartFooter: document.getElementById('cart-footer'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartTax: document.getElementById('cart-tax'),
    cartDelivery: document.getElementById('cart-delivery'),
    cartTotal: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    shopNowBtn: document.getElementById('shop-now-btn'),
    
    // Mobile Nav
    mobileToggle: document.getElementById('mobile-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    footerCategoryLinks: document.querySelectorAll('.cat-footer-link'),
    
    // Forms
    contactForm: document.getElementById('contact-form'),
    newsletterForm: document.getElementById('newsletter-form'),
    
    // Modal
    successModal: document.getElementById('success-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    modalOrderId: document.getElementById('modal-order-id'),
    modalDeliveryTime: document.getElementById('modal-delivery-time')
};

// --- Application Bootloader ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulate visual page setup for content shimmer skeletons
    setTimeout(() => {
        renderMenu();
    }, 800);
    
    // 2. Attach Event Handlers
    setupEventListeners();
});

// --- Event Handlers Core ---
function setupEventListeners() {
    // Sticky Scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Category Tabs Filter
    if (DOM.categoryFilters) {
        DOM.categoryFilters.addEventListener('click', handleCategoryFilter);
    }
    
    // Live Search input
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase().trim();
            renderMenu();
        });
    }
    
    // Price Sorter drop down
    if (DOM.sortSelect) {
        DOM.sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            renderMenu();
        });
    }
    
    // Drawer triggers
    if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', toggleCart);
    if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', toggleCart);
    if (DOM.cartOverlay) DOM.cartOverlay.addEventListener('click', toggleCart);
    if (DOM.shopNowBtn) DOM.shopNowBtn.addEventListener('click', toggleCart);
    
    // Mobile Navigation burger toggles
    if (DOM.mobileToggle) {
        DOM.mobileToggle.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('active');
            const icon = DOM.mobileToggle.querySelector('i');
            if (DOM.navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }
    
    // Nav links and close mobile navigation on click
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (DOM.navMenu.classList.contains('active')) {
                DOM.navMenu.classList.remove('active');
                DOM.mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // Footer categories shortcut bindings
    DOM.footerCategoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            const cat = link.getAttribute('data-cat');
            const pills = DOM.categoryFilters.querySelectorAll('.filter-pill');
            pills.forEach(p => {
                p.classList.remove('active');
                if (p.getAttribute('data-category') === cat) {
                    p.classList.add('active');
                }
            });
            activeCategory = cat;
            renderMenu();
        });
    });
    
    // Cart adjust quantities & delete buttons
    if (DOM.cartItemsContainer) {
        DOM.cartItemsContainer.addEventListener('click', handleCartItemAction);
    }
    
    // Place order
    if (DOM.checkoutBtn) {
        DOM.checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Modal dismiss
    if (DOM.closeModalBtn) {
        DOM.closeModalBtn.addEventListener('click', () => {
            DOM.successModal.classList.remove('active');
        });
    }
    
    // Form handlers
    if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showEthnicToast("Catering inquiry logged! Our managers will call you.", "success");
            DOM.contactForm.reset();
        });
    }
    
    if (DOM.newsletterForm) {
        DOM.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showEthnicToast("Welcome to Rasoi Club! Check mail for seasonal discounts.", "success");
            DOM.newsletterForm.reset();
        });
    }
}

// --- Sticky Scroll Triggers ---
function handleNavbarScroll() {
    if (window.scrollY > 40) {
        DOM.navbar.classList.add('scrolled');
    } else {
        DOM.navbar.classList.remove('scrolled');
    }
}

// --- Menu Rendering Core ---
function renderMenu() {
    // 1. Filtering matching active Category Pill and search strings
    let items = MENU_ITEMS.filter(item => {
        const matchesCategory = (activeCategory === "all" || item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                              item.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    // 2. Sorting matched dataset
    if (sortBy === "price-low") {
        items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        items.sort((a, b) => b.price - a.price);
    }
    
    // 3. Purge container
    DOM.menuGrid.innerHTML = "";
    
    // 4. Handle empty records
    if (items.length === 0) {
        DOM.menuGrid.innerHTML = `
            <div class="no-results-msg text-center" style="grid-column: 1 / -1; padding: 4rem 1rem;">
                <i class="fa-solid fa-fire-burner" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem; display: block;"></i>
                <h3 style="margin-bottom: 0.5rem; font-family: var(--font-heading);">Rasoi records are empty</h3>
                <p style="color: var(--text-secondary);">No match found. Try typing a different search word.</p>
            </div>
        `;
        return;
    }
    
    // 5. Append cards
    items.forEach(item => {
        const stars = generateRatingStars(item.rating);
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.setAttribute('data-id', item.id);
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
                <span class="card-badge">${formatCategoryBadge(item.category)}</span>
            </div>
            <div class="card-content">
                <div class="card-header-info">
                    <h3 class="card-title">${item.name}</h3>
                    <div class="card-rating">
                        ${stars}
                        <span>(${item.reviews})</span>
                    </div>
                </div>
                <p class="card-desc">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">₹${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" aria-label="Add ${item.name} to order" onclick="addToCart('${item.id}')">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        DOM.menuGrid.appendChild(card);
    });
}

// --- Category Badge Names Formatter ---
function formatCategoryBadge(category) {
    switch (category) {
        case "breakfast": return "Breakfast";
        case "starters": return "Starter / Farsan";
        case "shaak": return "Main Curry";
        case "rotla": return "Rotla / Flatbread";
        case "rice": return "Rice & Khichdi";
        case "sweets": return "Desi Sweet";
        case "sides": return "Accompaniments";
        default: return "Kathiyawad Special";
    }
}

// --- Star Rating Generator ---
function generateRatingStars(rating) {
    let starsHtml = "";
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        } else if (i === fullStars && halfStar) {
            starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star" style="color: var(--text-muted)"></i>';
        }
    }
    return starsHtml;
}

// --- Category Tab Selector Engine ---
function handleCategoryFilter(e) {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    
    const pills = DOM.categoryFilters.querySelectorAll('.filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    
    activeCategory = pill.getAttribute('data-category');
    renderMenu();
}

// --- Toggle Slide-in Shopping Cart Sidebar Drawer ---
function toggleCart() {
    DOM.cartSidebar.classList.toggle('active');
    DOM.cartOverlay.classList.toggle('active');
    
    if (DOM.cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// --- Cart Actions ---
function addToCart(id) {
    const product = MENU_ITEMS.find(item => item.id === id);
    if (!product) return;
    
    const cartItem = cart.find(item => item.product.id === id);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            product: product,
            quantity: 1
        });
    }
    
    showEthnicToast(`Added ${product.name} to Rasoi order!`, "food");
    updateCartUI();
}

function handleCartItemAction(e) {
    const itemRow = e.target.closest('.cart-item');
    if (!itemRow) return;
    
    const productId = itemRow.getAttribute('data-id');
    
    if (e.target.closest('.qty-btn-plus')) {
        adjustItemQuantity(productId, 1);
    }
    else if (e.target.closest('.qty-btn-minus')) {
        adjustItemQuantity(productId, -1);
    }
    else if (e.target.closest('.remove-item-btn')) {
        removeFromCart(productId);
    }
}

function adjustItemQuantity(id, delta) {
    const item = cart.find(item => item.product.id === id);
    if (!item) return;
    
    item.quantity += delta;
    
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCartUI();
    }
}

function removeFromCart(id) {
    const item = cart.find(item => item.product.id === id);
    const itemName = item ? item.product.name : "Item";
    
    cart = cart.filter(item => item.product.id !== id);
    showEthnicToast(`Removed ${itemName} from order`, "info");
    
    updateCartUI();
}

// --- Update Drawer Content ---
function updateCartUI() {
    const totalCount = cart.reduce((accum, item) => accum + item.quantity, 0);
    DOM.cartCountBadge.textContent = totalCount;
    
    DOM.cartBtn.classList.add('pulse');
    setTimeout(() => DOM.cartBtn.classList.remove('pulse'), 400);
    
    const emptyMsg = DOM.emptyCartMessage;
    DOM.cartItemsContainer.innerHTML = "";
    DOM.cartItemsContainer.appendChild(emptyMsg);
    
    if (cart.length === 0) {
        DOM.emptyCartMessage.style.display = "flex";
        DOM.cartFooter.style.display = "none";
        document.getElementById('cart-items-count').textContent = "(0 items)";
        return;
    }
    
    DOM.emptyCartMessage.style.display = "none";
    DOM.cartFooter.style.display = "flex";
    document.getElementById('cart-items-count').textContent = `(${totalCount} item${totalCount !== 1 ? 's' : ''})`;
    
    // Render item rows
    cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.setAttribute('data-id', item.product.id);
        
        itemRow.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-price">₹${item.product.price.toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn qty-btn-minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn qty-btn-plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button class="remove-item-btn" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;
        
        DOM.cartItemsContainer.appendChild(itemRow);
    });
    
    // Calculate sums
    const subtotal = cart.reduce((accum, item) => accum + (item.product.price * item.quantity), 0);
    const taxRate = 0.05; // 5% GST on Restaurant orders
    const tax = subtotal * taxRate;
    const delivery = 40.00; // Flat packaging & delivery charge (INR)
    const total = subtotal + tax + delivery;
    
    DOM.cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    DOM.cartTax.textContent = `₹${tax.toFixed(2)}`;
    DOM.cartDelivery.textContent = `₹${delivery.toFixed(2)}`;
    DOM.cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// --- Order Checkout Engine ---
function handleCheckout() {
    if (cart.length === 0) return;
    
    const tokenIdStr = `#KATH-${Math.floor(10000 + Math.random() * 90000)}`;
    const prepTimeMinutes = `${Math.floor(20 + Math.random() * 10)} - ${Math.floor(35 + Math.random() * 10)} minutes`;
    
    DOM.modalOrderId.textContent = tokenIdStr;
    DOM.modalDeliveryTime.textContent = prepTimeMinutes;
    
    toggleCart();
    
    setTimeout(() => {
        DOM.successModal.classList.add('active');
        cart = [];
        updateCartUI();
    }, 450);
}

// --- Global UI Ethnic Toast Notification Engine ---
function showEthnicToast(message, type = "success") {
    const existing = document.querySelector('.aura-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `aura-toast toast-${type}`;
    
    let iconClass = "fa-circle-check";
    if (type === "food") iconClass = "fa-fire-burner";
    if (type === "info") iconClass = "fa-circle-info";
    if (type === "error") iconClass = "fa-circle-exclamation";
    
    toast.innerHTML = `
        <div class="toast-body">
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Dynamically insert CSS rules if missing
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .aura-toast {
                position: fixed;
                bottom: 30px;
                left: 30px;
                z-index: 9999;
                background: rgba(25, 18, 13, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid var(--accent);
                color: #ffffff;
                padding: 14px 24px;
                border-radius: 50px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(211, 84, 0, 0.2);
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .aura-toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            .toast-body {
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 600;
                font-size: 0.95rem;
            }
            .toast-icon {
                color: var(--accent-light);
                font-size: 1.2rem;
            }
            .toast-info .toast-icon {
                color: #3498db;
            }
            .toast-error .toast-icon {
                color: #e74c3c;
            }
            @keyframes pulseGlow {
                0% { transform: scale(1); }
                50% { transform: scale(1.06); }
                100% { transform: scale(1); }
            }
            .cart-toggle-btn.pulse {
                animation: pulseGlow 0.4s ease;
            }
            @media (max-width: 480px) {
                .aura-toast {
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border-radius: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}
