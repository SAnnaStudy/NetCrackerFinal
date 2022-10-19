import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from "react";
import { Context } from "..";
import { fetchRecipes } from "../http/recipeAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RECIPE_ROUTE } from "../utils/const";


const styles = {
    content: {
        width: '91.1%',
        height: '1000px',
        margin: 'auto',
        padding: '50px 0 50px'
    },
    list: {
        width: '89%',
        margin: 'auto',
        paddingTop: '70px',
        minHeight: '0px'
    },
    input: {
        width: '90%',
        height: '41px',
        border: 'none',
        margin: '0 0 0 10px',
    },
    searchForm: {
        border: '2px solid rgb(179, 179, 179)',
        width: '70%',
        margin: '0 4.9%',
        display: 'inline-block',
        float: 'left'
    },
    autocomplite: {
        position: 'absolute',
        width: '63.8%',
        backgroundColor: 'white',
        listStyle: 'none',
        maxHeight: '240px',
        height: 'auto',
        margin: '0',
        paddingTop: '0',
        boxShadow: '1px 1px 5px rgba(0,0,0,0.15)',
        zIndex: 1
    },
    autocomplite_item: {
        padding: '10px',
    },
    button: {
        backgroundColor: 'rgba(130, 175, 51, 1)',
        borderRadius: '70px',
        width: '194px',
        height: '38px',
        fontSize: '18px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px 0 0 23px'
    },
    h2: {
        fontSize: '25px',
        weight: '600',
        margin: '10px 0 10px 4.9%'
    }
}

let newMass = [{}];

const SearchByName = observer(() => {
    const navigate = useNavigate()

    const { recipe } = useContext(Context);

    //хранение данных из инпута
    const [value, setValue] = useState('')

    const [isOpen, setIsOpen] = useState(true);
    const [needToShow, setNeedToShow] = useState(false);
    const filteredFoods = recipe._recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(value.toLowerCase())
    })
    
    const addFood = () => {
        newMass = [];
        recipe._recipes.map((f) => {
            if (f.name.includes(value)) {
                newMass.push(f);
            }
        })
    }
    const buttonClick = () => {
        addFood();
        if (value) {
            setNeedToShow(true);
        }
    }

    const inputClick = (e) => {
        e.target.style.outline = 'none';
        setIsOpen(true);
        setNeedToShow(false);
    }
    const buttonLeave = (e) => {
        e.target.style.backgroundColor = 'rgba(130, 175, 51, 1)';
    }
    const buttonEnter = (e) => {
        e.target.style.backgroundColor = 'rgb(102, 138, 40)';
        e.target.style.cursor = 'pointer';
    }

    return (
        <div style={styles.content}>
            <div style={styles.h2}>Поиск по названию рецепта</div>
            <form className='searchForm' style={styles.searchForm}>
                <input type='text' value={value} style={styles.input} onChange={(event) => setValue(event.target.value)} placeholder="Начните вводить или выберите из предложенных" onClick={inputClick}></input>
                <div className="autocomplite" style={styles.autocomplite}>
                    {
                        value && isOpen ?
                            filteredFoods.map((recipe) => {
                                return (
                                    <div className="autocomplite_item" style={styles.autocomplite_item} onClick={(event) => navigate(RECIPE_ROUTE + '/' + recipe.id)}>{recipe.name}</div>
                                )
                            })
                            : null
                    }
                </div>
            </form>
            <div style={styles.button} onMouseLeave={buttonLeave} onMouseEnter={buttonEnter} onClick={buttonClick}>Найти</div>
        </div>
    )
})

export default SearchByName;
