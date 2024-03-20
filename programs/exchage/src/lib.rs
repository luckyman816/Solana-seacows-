use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
use solana_program::system_instruction;

declare_id!("BYPuc9phKaVB5Xpp6dXDgEF3zByVt7EaetLrZkUWuxhB"); // shouldn't be similar to mine

#[program]
pub mod exchange {
    use super::*;
    pub fn transfer_usdt_tokens(ctx: Context<TransferSpl>, amount: u64) -> Result<()> {
        let destination = &ctx.accounts.to_ata;
        let source = &ctx.accounts.from_ata;
        let token_program = &ctx.accounts.token_program;
        let authority = &ctx.accounts.from;

        // Transfer tokens from taker to initializer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };
        let cpi_program = token_program.to_account_info();
        
        token::transfer(
            CpiContext::new(cpi_program, cpi_accounts),
            amount)?;
        Ok(())
    }
}


#[derive(Accounts)]
pub struct TransferSpl<'info> {
    pub from: Signer<'info>,
    #[account(mut)]
    pub from_ata: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}