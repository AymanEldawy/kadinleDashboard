trigger on contract 
    if contract building is Owned
    {
        value from customer account to : (
            if apartment sale : account where code 41
            if shop sale : account where code 42
            if apartment rent : account where code 43
            if shop rent : account where code 44 
            )
        Fine value from customer account to : fine account !!
        Insurance value from customer account to : insurance account !!
    }
        
    if management :
        value from customer account
        commission value to : (
            if sale : account where code 45
            if rent : account where code 46
            )
        value - commission value to owner account
        Fine value from customer account to : fine account !!
        Insurance value from customer account to : insurance account !!



