"use client";
import React, { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const subscribeItems = [
  {
    subscriptionName: "Basic",
    price: 0,
    billingPeriod: "monthly",
    features: [
      {
        text: "1,000 address validations/month",
        tooltip: "Validate and standardize up to 1,000 addresses per month",
      },
      {
        text: "Basic address standardization",
        tooltip: "Formats addresses according to postal standards",
      },
      {
        text: "Simple geocoding",
        tooltip: "Convert addresses to latitude and longitude coordinates",
      },
      {
        text: "98% accuracy rate",
        tooltip: "Industry-standard accuracy for basic address validation",
      },
      {
        text: "Email support",
        tooltip: "Response within 24 hours during business days",
      },
    ],
    highlight: false,
    ctaText: "Start Free Trial",
    popular: false,
  },
  {
    subscriptionName: "Pro",
    price: 49,
    billingPeriod: "monthly",
    features: [
      {
        text: "50,000 address validations/month",
        tooltip:
          "Perfect for growing businesses with moderate validation needs",
      },
      {
        text: "Advanced address normalization",
        tooltip:
          "Enhanced address cleaning and standardization with fuzzy matching",
      },
      {
        text: "Precise geocoding & mapping",
        tooltip: "High-precision coordinate mapping with reverse geocoding",
      },
      {
        text: "99.5% accuracy rate",
        tooltip: "Enterprise-grade accuracy with automatic corrections",
      },
      {
        text: "Batch processing up to 1,000 addresses",
        tooltip: "Process multiple addresses simultaneously",
      },
      {
        text: "REST API access",
        tooltip: "Full API access with comprehensive documentation",
      },
      {
        text: "Priority support",
        tooltip: "Priority email and chat support with 4-hour response time",
      },
    ],
    highlight: true,
    ctaText: "Subscribe Now",
    popular: true,
  },
  {
    subscriptionName: "Enterprise",
    price: "Custom",
    billingPeriod: "custom",
    features: [
      {
        text: "Unlimited address validations",
        tooltip: "No monthly limits on address validation",
      },
      {
        text: "Custom address rules & formats",
        tooltip: "Tailored validation rules for your specific needs",
      },
      {
        text: "Advanced geocoding with polygon data",
        tooltip: "Includes building footprints and boundary data",
      },
      {
        text: "99.9% accuracy guarantee",
        tooltip:
          "Highest possible accuracy with manual verification when needed",
      },
      {
        text: "Unlimited batch processing",
        tooltip: "Process any number of addresses simultaneously",
      },
      {
        text: "Full API access with custom endpoints",
        tooltip: "Custom API endpoints tailored to your needs",
      },
      {
        text: "Dedicated support manager",
        tooltip: "Personal account manager for direct support",
      },
      {
        text: "Service Level Agreement (SLA)",
        tooltip: "Guaranteed uptime and performance metrics",
      },
    ],
    highlight: false,
    ctaText: "Contact Sales",
    popular: false,
  },
];

function SubscribeCards() {
  const [billingInterval, setBillingInterval] = useState("monthly");

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-gray-600 mb-6">
          Choose the perfect plan for your address validation needs
        </p>
        <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingInterval("monthly")}
            className={`px-4 py-2 rounded-md transition-all ${
              billingInterval === "monthly"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval("annually")}
            className={`px-4 py-2 rounded-md transition-all ${
              billingInterval === "annually"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600"
            }`}
          >
            Annually
            <span className="ml-1 text-sm text-green-500">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        {subscribeItems.map((item, index) => (
          <Card
            key={index}
            className={`flex flex-col relative transform transition-all duration-300 hover:scale-105 ${
              item.highlight
                ? "border-blue-500 border-2 shadow-lg"
                : "hover:shadow-xl"
            }`}
          >
            {item.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {item.subscriptionName}
              </CardTitle>
              <CardDescription className="text-4xl font-bold mt-4">
                {typeof item.price === "number"
                  ? `$${
                      billingInterval === "annually"
                        ? Math.floor(item.price * 0.8)
                        : item.price
                    }`
                  : item.price}
                {typeof item.price === "number" && (
                  <span className="text-base font-normal text-gray-600">
                    /{billingInterval === "annually" ? "year" : "month"}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {item.features.map((feature, featureIndex) => (
                  <TooltipProvider key={featureIndex}>
                    <Tooltip>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature.text}</span>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                      </li>
                      <TooltipContent>
                        <p className="text-sm">{feature.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full py-6 text-base font-medium transition-all duration-300 ${
                  item.highlight
                    ? "bg-blue-500 hover:bg-blue-600"
                    : item.price === 0
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {item.ctaText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 space-y-4">
        <p className="text-sm text-gray-600">
          All plans include basic address validation, API documentation, and SSL
          encryption.
        </p>
        <div className="flex justify-center gap-2 text-sm text-gray-600">
          <span>🔒 Secure payment</span>
          <span>•</span>
          <span>Cancel anytime</span>
          <span>•</span>
          <span>24/7 support</span>
        </div>
      </div>
    </div>
  );
}

export default SubscribeCards;
