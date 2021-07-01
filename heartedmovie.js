//https://github.com/motdotla/dotenv
require('dotenv').config();

//https://github.com/supabase/supabase-js
const supabase = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://egjmvmblnlwardrjogrb.supabase.co';
const supabaseClient = supabase.createClient(SUPABASE_URL, process.env.SUPABASE_KEY);



module.exports = {
  index: index,
  show: show,
  create: create,
};

