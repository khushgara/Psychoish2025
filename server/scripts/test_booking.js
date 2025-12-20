import axios from 'axios';

const testBooking = async () => {
  try {
    console.log("🚀 Testing Consultation API...");
    const response = await axios.post('http://localhost:5000/api/consultations/book', {
      name: "Integration Test User",
      email: "integration@test.com",
      phone: "555-0199",
      consultation_type: "therapy",
      description: "Testing API from Node script"
    });

    if (response.status === 201) {
      console.log("✅ API Test Passed!");
      console.log("Response:", response.data);
    } else {
      console.log(`❌ API Test Failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("❌ API Test Error:", error.response ? error.response.data : error.message);
    process.exit(1);
  }
};

testBooking();
