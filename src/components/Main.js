import logo from '../assets/img/Tether_logo.png';

export const Main = (props) => {
  const {tetherTokenBalance, stakeTokens, unstakeTokens} = props;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let amount
          amount = this.input.value.toString()
          amount = window.web3.utils.toWei(amount, 'Ether')
          stakeTokens(amount)
        }}>
          <div>
            <label className="float-left"><b>Stake Tokens</b></label>
            <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(tetherTokenBalance, 'Ether')}
                </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              ref={(input) => {
                this.input = input
              }}
              className="form-control form-control-lg"
              placeholder="0"
              required/>
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={logo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; mTether
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
        </form>
        <button
          type="submit"
          className="btn btn-link btn-block btn-sm"
          onClick={(event) => {
            event.preventDefault();
            unstakeTokens();
          }}>
          UN-STAKE...
        </button>
      </div>
    </div>
  )
}

export default Main;
