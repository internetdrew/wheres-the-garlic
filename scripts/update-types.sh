#!/bin/bash

echo "Updating local types..."
npx supabase gen types typescript --local > database.types.ts

echo "Types updated successfully!"
