const anchor = require('@project-serum/anchor');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Initialize the provider
const provider = new anchor.Provider(wallet, {
  preflightCommitment: 'confirmed',
});

// Initialize the program
const programId = new anchor.web3.PublicKey('BYPuc9phKaVB5Xpp6dXDgEF3zByVt7EaetLrZkUWuxhB');
const program = new anchor.Program(exchange.program, programId, provider);

// Set up the transfer parameters
const fromAccount = new anchor.web3.PublicKey('YOUR_FROM_ACCOUNT_ADDRESS');
const toAccount = new anchor.web3.PublicKey('YOUR_TO_ACCOUNT_ADDRESS');
const amount = 100; // Specify the amount to transfer

// Call the transfer_usdt_tokens function
(async () => {
  try {
    const tx = await program.rpc.transfer_usdt_tokens(amount, {
      accounts: {
        from: provider.wallet.publicKey,
        from_ata: fromAccount,
        to_ata: toAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [provider.wallet.payer],
    });

    console.log('Transaction successful:', tx);
  } catch (err) {
    console.error('Error occurred:', err);
  }
})();



// ```

// In this code snippet:
// - Replace `'BYPuc9phKaVB5Xpp6dXDgEF3zByVt7EaetLrZkUWuxhB'` with the program ID of your Solana smart contract.
// - Replace `'YOUR_FROM_ACCOUNT_ADDRESS'` and `'YOUR_TO_ACCOUNT_ADDRESS'` with the respective account addresses you want to transfer tokens between.
// - Adjust the `amount` variable to specify the amount of tokens to transfer.

// Make sure to have the necessary dependencies installed and adjust the code according to your specific requirements and environment.