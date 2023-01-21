module.exports=async({getNamedAddress,deployment}) =>{
    const{deploy,log}=deployment
    const{deployer}=await getNamedAddress()
    const chainId=network.config.chainId
}