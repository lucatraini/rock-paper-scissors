gender_encoding = {"uomo": 1,
                   "donna": 2,
                   "altro": 3}

results_encoding = {"win": 0,
                    "lose": 1,
                    "draw": 2}

choices_encoding = {"rock": 1,
                    "paper": 2,
                    "scissors": 3} 

education_encoding = { "Licenza media": 1,
                        "Diploma di scuola superiore": 2,
                        "Laurea di primo livello": 3,
                        "Laurea di secondo livello": 4,
                        "Master/Dottorato di ricerca/Specializzazione": 5}


def encode(df):
    df["scolarita"].replace(education_encoding, inplace=True)
    df["sesso"].replace(gender_encoding, inplace=True)
    df.replace(choices_encoding, inplace=True)
    df.replace(results_encoding, inplace=True)
    

