import React, {useState} from "react";
const styles={
    content: {
        height: '1000px',
        width: '91.1%',
        margin: 'auto',
        padding: '50px 0 50px'
    },
    inp: {
        width: '90%',
        height: '41px',
        border: 'none',
        margin: '0 0 0 10px',
    },
    searcher: {
        border: '2px solid rgb(179, 179, 179)',
        width: '90%',
        margin: '0 auto'
    },
    autocomplite: {
        position: 'absolute',
        width: '82%',
        backgroundColor: 'white',
        listStyle: 'none',
        maxHeight: '240px',
        height: 'auto',
        margin: '0',
        padding: '0',
        boxShadow: '1px 1px 5px rgba(0,0,0,0.15)',
        zIndex: 1
    },
    autocomplite_item: {
        padding: '10px',
    },
    newM: {
        height: '25px',
        minWidth: '20px',
        margin: '10px 0 5px 8px',
        backgroundColor: 'rgb(224, 224, 224)',
        padding: '2px 3px 2px 3px',
    },
    newMs: {
        display: 'flex'
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
      margin: 'auto'
  },
    p: {
        margin: '0 0 50px 69px',
    },
    h2: {
      fontSize: '25px',
      weight: '600',
      margin: '10px 0 10px 4.9%'
  }
}
const tags = ['что-то1', 'что-то2', 'что-то3'];
let newMass = [];

export default React.memo(function SearchByIngredients(props){
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const filteredTags = tags.filter(tag => {
        return tag.toLowerCase().includes(value.toLowerCase())
    })
    const tagClick = (e) => {
        setValue(e.target.textContent);
        checkAdd(e);
        setIsOpen(!isOpen);
    }
    const checkAdd = (e) => {
        if (!newMass.includes(e.target.textContent)){
            newMass.push(e.target.textContent);
        }
    }
    const inputClick = (e) => {
        e.target.style.outline =  'none';
        setIsOpen(true);
    }
    const removeItem = newM => {
        newMass = newMass.filter(el => el !== newM);
    }
    const cleanTags = (e) => {
        e.target.style.color =  'green';
        newMass = [];
    }
    const cleanStyleLeave = (e) => {
        e.target.style.color =  'black';
    }
    const cleanStyleEnter = (e) => {
        e.target.style.color =  'green';
        e.target.style.cursor =  'pointer';
    }
    const buttonLeave = (e) => {
        e.target.style.backgroundColor = 'rgba(130, 175, 51, 1)';
    }
    const buttonEnter = (e) => {
        e.target.style.backgroundColor =  'rgb(102, 138, 40)';
        e.target.style.cursor =  'pointer';
    }
    return(
        <div style={styles.content}>
            <div style={styles.h2}>Поиск по ингридиентам</div>   
            <form className="searcher" style={styles.searcher}>
                <div style={styles.newMs}>
                    {
                        newMass.map((newM) => {
                            return (
                                <div style={styles.newM}>
                                    <span>{newM} </span>
                                    <span onClick={() => removeItem(newM)}>x</span>
                                </div>
                            )
                        })
                    }
                </div>
                <input type='text' value = {value} style={styles.inp} placeholder="Начните вводить или выберите из предложенных" onChange={(event) => setValue(event.target.value)} onClick={inputClick}/>
                <div className="autocomplite" style={styles.autocomplite}>
                    {
                        value && isOpen ?
                        filteredTags.map((tag) => {
                                return (
                                    <div className="autocomplite_item" style={styles.autocomplite_item} onClick={tagClick}>{tag}</div>
                                )
                            })
                        : null
                    }
                </div>
            </form>
            <div style={styles.p} onClick={cleanTags} onMouseLeave={cleanStyleLeave} onMouseEnter={cleanStyleEnter}>Отчистить выбранное</div>
            <div style={styles.button} onMouseLeave={buttonLeave} onMouseEnter={buttonEnter}>Найти</div>
        </div>
    )
})