/*
 * This program WILL (not yet) take in data from the database, transmit to int form, and then find ratios as a double. 
 */

public class formulas {
    //Initialize variables
    int cash;
    int accountsRecievable;
    int totalLiabilties;
    int currentLiabilties;
    int revenues;
    int expenses;
    int totalAssets;
    int currentAssets;
    //Constructor
    public formulas(int cash, int accountsRecievable, int totalLiabilties, int currentLiabilties, int revenues, int expenses, 
    int totalAssets, int currentAssets){
        //Set values
        this.cash = cash;
        this.accountsRecievable = accountsRecievable;
        this.totalLiabilties = totalLiabilties;
        this.currentLiabilties = currentLiabilties;
        this.revenues = revenues;
        this.expenses = expenses;
        this.totalAssets = totalAssets;
        this.currentAssets = currentAssets;
    }
    //Main
    public static void main(String[] args){
        //Initialize instance of accounts
        formulas myAccounts = new formulas(1000, 500, 700, 400, 30000, 10000, 2000, 1500);
        //Print. Later we will send to front end, recommend keep for testing and debug purposes.
        System.out.println(currentRatio(myAccounts));
        System.out.println(quickRatio(myAccounts));
        System.out.println(profitMargin(myAccounts));
        System.out.println(debtRatio(myAccounts));
    }
    //Current ratio: divides current assets (cash, accounts recievable, short term investments) by current liabilities (mainly accounts payable)
    public static double currentRatio(formulas accounts){
        return accounts.currentAssets/accounts.currentLiabilties;
    }
    //Quick ratio: divides high liquidity current assets (cash and accounts recievable) by current liabilities
    public static double quickRatio(formulas accounts){
        return (accounts.cash + accounts.accountsRecievable) / accounts.currentLiabilties;
    }
    //Profit margin: divides net income (revenues-expenses) by gross revenues
    public static double profitMargin(formulas accounts){
        return (accounts.revenues-accounts.expenses)/accounts.revenues;
    }
    //Debt ratio: divides debt (liabilities) by assets
    public static double debtRatio(formulas accounts){
        return accounts.totalLiabilties/accounts.totalAssets;
    }
}
