export const movementSpeed = {
    title: 'Movement Speed',
    text: 'The lower the number the faster the bot will go! Drag the circle all the way to the right for the fastest speed',
    confirmButtonText: 'OK'
}

export const arenaSize = {
    title: 'Arena Size',
    text: 'Some board sizes are disabled according to screensize. The larger the screensize the more board options you will have.',
    confirmButtonText: 'OK'
}

export const booleanOperator = {
    title: 'Boolean Operator',
    html: `
        <section>
        <h4> AND:</h4>
        <p> When both Bot 1 and Bot 2 have a boolean value of 0 (false), the result is 0. This leads to a tie since neither bot wins.</p>
        <p> When Bot 1 has a boolean value of 0 (false) and Bot 2 has a boolean value of 1 (true), the result is 0. Again, this results in a tie.</p>
        <p> Similarly, when Bot 1 has a boolean value of 1 (true) and Bot 2 has a boolean value of 0 (false), the result is 0, leading to a tie.</p>
        <p> When both Bot 1 and Bot 2 have a boolean value of 1 (true), the result is 1. In this case, the first bot to move is considered the winner.</p>
        </section>
        <section>
        <h4>OR:</h4>
        <p> If either Bot 1 or Bot 2 (or both) has a boolean value of 1 (true), the result is 1. In this case, the first bot to move is considered the winner.</p>
        <p> When both Bot 1 and Bot 2 have a boolean value of 0 (false), the result is 0. This leads to a tie.</p>
        </section>
        <section>
        <h4>XOR:</h4>
        <p> When both Bot 1 and Bot 2 have the same boolean value (either both true or both false), the result is 0. This results in a tie.</p>
        <p> If Bot 1 and Bot 2 have different boolean values (one is true and the other is false), the result is 1. In this case, the first bot to move is considered the winner.</p>
        </section>
        <section>
        <h4>NOR: </h4> 
        <p> If both Bot 1 and Bot 2 have a boolean value of 0 (false), the result is 1. In this case, the first bot to move is considered the winner.</p>
        <p> When either Bot 1 or Bot 2 (or both) has a boolean value of 1 (true), the result is 0. This leads to a tie.</p>
        </section>
        <p>
        `,
    confirmButtonText: 'OK'
}

export const booleanError = {
    title: 'Boolean Operator',
    text: 'Pick either 0 or 1 and this will determine the outcome of a collision between two bots. When two bots collide, the boolean values are evaluated using the boolean operation that was chosen on the Arena Settings page',
    confirmButtonText: 'OK'
  }

export const uniqueName = {
    icon: "error",
    title: "Oops...",
    text: `* Each Bots should have unique names`,  
  }