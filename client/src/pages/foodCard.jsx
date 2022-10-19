import React from "react";
import { useContext } from "react";
import { Context } from "..";

const styles={
    card: {
        backgroundColor: 'rgba(205, 223, 173, 0.8)',
       // width: '350px',
        width: '360px',
        height: '400px',
        display: 'inline-block',
        margin: '0 20px 20px 25px'
    },
    name: {
        width: '100%',
        fontWeight: '500',
        fontSize: '20px',
        alignItems: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
        padding: '27px 0 25px'
    },
    image: {
        height: '221px',
        width: '100%',
        backgroundColor: 'green',
    },
    ingr: {
        fontSize: '18px',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        marginTop: '5px'
    }
}
export default React.memo(function FoodCard({recipe}){
    return(
        <div className="card" style={styles.card}>
            <div style={styles.name}>{recipe.name}</div>
            <div style={styles.image}>{recipe.image}</div>
        </div>
    )
})