$body = @{
    name = "Integration Test User"
    email = "integration@test.com"
    phone = "555-0199"
    consultation_type = "therapy"
    description = "Testing API from script"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/consultations/book" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop

Write-Host "Response Status: $($response.StatusCode)"
Write-Host "Response Content: $($response.Content)"

if ($response.StatusCode -eq 201) {
    Write-Host "✅ API Test Passed!"
} else {
    Write-Host "❌ API Test Failed!"
    exit 1
}
