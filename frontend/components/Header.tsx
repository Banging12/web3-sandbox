import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import WalletModal from './WalletModal'
import providerContext from '../context/context'

const Header = () => {
  const { klaytnProvider, ethProvider } = useContext(providerContext)
  const [walletModal, setWalletModal] = useState<boolean>(false)
  const [network, setNetwork] = useState()

  const detectNetwork = () => {
    if (klaytnProvider) {
      const networkId = klaytnProvider.networkVersion
      console.log('network id:', networkId)
      if (networkId === 1001) {
        setNetwork('Baobab')
      } else if (networkId === 8217) {
        setNetwork('Cypress')
      }
    }
  }
  const checkKaikasStatus = async () => {
    const enabled = klaytnProvider._kaikas.isEnabled()
    console.log('enabled: ', enabled)
    const approved = await klaytnProvider._kaikas.isApproved()
    console.log('approved: ', approved)
    const unlocked = await klaytnProvider._kaikas.isUnlocked()
    console.log('unlocked: ', unlocked)
  }

  useEffect(() => {
    if (ethProvider && klaytnProvider) {
      console.log('eth provider:', ethProvider)
      console.log('klay provider:', klaytnProvider)
      klaytnProvider.on('networkChanged', function () {
        detectNetwork()
      })
      if (!network) {
        detectNetwork()
      }
      checkKaikasStatus()
    }
  }, [ethProvider, klaytnProvider])

  return (
    <header className="flex place-content-between p-6 items-center text-gray-900 bg-gray-100 shadow shadow-md">
      <WalletModal walletModal={walletModal} setWalletModal={setWalletModal} />
      <Link href="/">
        <a className="mx-10">Klaytn Kit</a>
      </Link>
      <ul>
        <li className="mx-10">
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
      </ul>
      <ul className="flex items-right">
        <div className="flex justify-center items-center">
          <span>{network}</span>
          <li className="mx-10">
            <button
              className="rounded-full bg-blue-600 p-3 text-white"
              onClick={() => setWalletModal(true)}
            >
              Connect Wallet
            </button>
          </li>
        </div>
      </ul>
    </header>
  )
}

export default Header
