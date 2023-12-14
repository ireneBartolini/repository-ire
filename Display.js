'use strict';

class Display extends React.Component {

    render() {
    let num_vinte = this.props.num_vinte;
    let giocate = this.props.giocate;
    return (
        <div className="giocate">
        <p>Partite Giocate:{giocate}</p>
        <p>Partite Vinte:{num_vinte}</p>
        </div>
        );
    }
}
