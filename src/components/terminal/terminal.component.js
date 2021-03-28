import React, { Component } from 'react';
import "./terminal.component.css";


export default class Terminal extends Component {

    constructor(props) {
        super(props);

        this.ref = React.createRef();

        this.canvas = null;
        this.ctx = null;

        this.intervall = null;
        this.keyListener = null;

        this.errorSound = new Audio("/assets/error.mp3");
        this.errorCooldown = false;

        this.terminal_activ = true;
        this.allowedKeyCodes = [ 32, 190, 55, 189 ];
        
        this.update = this.update.bind(this);
        this.keydown = this.keydown.bind(this);

        this.state = {
            input: "clown",
            lines: [ "GRUB Loadingd..." ]
        }
    }

    error() {
        if (!this.errorCooldown) {
            
            this.errorSound.volume = 0.000;
            this.errorSound.play();
            this.errorCooldown = true;
            
            setTimeout(() => {
                this.errorCooldown = false;
            }, 300)
        }
    }

    valid_code(c) {
        return (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || this.allowedKeyCodes.includes(c)
    }

    keydown(evt) {

        let keyCode = evt.keyCode || evt.which;

        console.log(String.fromCharCode(keyCode).toLocaleLowerCase())

        if (keyCode == 8) // Handle Delete Key
            this.setState({ input: this.state.input.slice(0, this.state.input.length - 1) });
        else if (keyCode == 13)
            this.enter();
        else if (this.valid_code(keyCode)) // Check if input is a-z or 0-9 or space and if input length is not too long
            if (this.state.input.length < 30)
                this.setState({ input: String.fromCharCode(keyCode).toLowerCase() });
            else this.error();
        else this.error();
    }

    update() {

        console.log(this.state.input)

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#22E500";
        this.ctx.font = "2.5vh 'VT323'";

        for (let i = 0; i < this.state.lines.length; i++) 
            this.ctx.fillText(this.state.lines[i], 40, i * 25 + 40); // margin = 40

        if (this.terminal_activ) 
            this.ctx.fillText("kali@root: " + this.state.input, 40, this.state.lines.length * 25 + 40);
    }

    componentDidMount () {

        this.canvas = this.ref.current;
        this.ctx = this.canvas.getContext("2d"); 

        this.intervall = setInterval(this.update, 100)

        this.keyListener = document.addEventListener("keypress", this.keydown);
    }

    render() {

        return(
            <div>
                <canvas ref={this.ref}></canvas>
            </div>
        );
    }
}

/*

    keydown(evt) {

        let keyCode = evt.keyCode || evt.which;

        if (keyCode === 8) // Handle Delete Key
            this.input = this.input.slice(0, this.input.length - 1) 
        else if (keyCode == 13)
            this.enter();
        else if (this.valid_code(keyCode)) // Check if input is a-z or 0-9 or space and if input length is not too long
            if (this.input.length < 30)
                this.input += String.fromCharCode(keyCode).toLowerCase();
            else this.error();
        else this.error();
    }
*/ 