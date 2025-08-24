--  users table is created by Supabase directly, so we don't need to create it here.

 -- Create profile table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

 -- Enable Row Level Security for profiles
 ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

  -- Policy for profiles: Users can view their own records
 CREATE POLICY "Users can view their own profiles."
 ON public.profiles FOR SELECT
 USING (auth.uid() = user_id);

 -- Policy for profiles: Users can insert their own records
 CREATE POLICY "Users can insert their own profiles."
 ON public.profiles FOR INSERT
 WITH CHECK (auth.uid() = user_id);

 -- Policy for profiles: Users can update their own records
 CREATE POLICY "Users can update their own profiles."
 ON public.profiles FOR UPDATE
 USING (auth.uid() = user_id);

 -- Policy for profiles: Users can delete their own records
 CREATE POLICY "Users can delete their own profiles."
 ON public.profiles FOR DELETE
 USING (auth.uid() = user_id);

 -- Create financial_data table
 CREATE TABLE public.financial_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  direct_equity numeric DEFAULT 0,
  esops numeric DEFAULT 0,
  equity_pms numeric DEFAULT 0,
  ulip numeric DEFAULT 0,
  real_estate numeric DEFAULT 0,
  real_estate_funds numeric DEFAULT 0,
  private_equity numeric DEFAULT 0,
  equity_mutual_funds numeric DEFAULT 0,
  structured_products_equity numeric DEFAULT 0,
  bank_balance numeric DEFAULT 0,
  debt_mutual_funds numeric DEFAULT 0,
  endowment_plans numeric DEFAULT 0,
  fixed_deposits numeric DEFAULT 0,
  nps numeric DEFAULT 0,
  epf numeric DEFAULT 0,
  ppf numeric DEFAULT 0,
  structured_products_debt numeric DEFAULT 0,
  gold_etfs numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

 -- Enable Row Level Security for financial_data
 ALTER TABLE public.financial_data ENABLE ROW LEVEL SECURITY;

 -- Policy for financial_data: Users can view their own records
 CREATE POLICY "Users can view their own financial_data."
 ON public.financial_data FOR SELECT
 USING (auth.uid() = user_id);

 -- Policy for financial_data: Users can insert their own records
 CREATE POLICY "Users can insert their own financial_data."
 ON public.financial_data FOR INSERT
 WITH CHECK (auth.uid() = user_id);

 -- Policy for financial_data: Users can update their own records
 CREATE POLICY "Users can update their own financial_data."
 ON public.financial_data FOR UPDATE
 USING (auth.uid() = user_id);

 -- Policy for financial_data: Users can delete their own records
 CREATE POLICY "Users can delete their own financial_data."
 ON public.financial_data FOR DELETE
 USING (auth.uid() = user_id);