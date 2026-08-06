package com.example.cloudstorage.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private static final String SECRET = "mysecretkeymysecretkeymysecretkey123456";

	private static final long JWT_EXPIRATION = 1000 * 60 * 60; // 1 Hour

	private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

	// ==========================
	// Generate JWT Token
	// ==========================
	public String generateToken(String email) {

		return Jwts.builder().setSubject(email).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
				.signWith(key, SignatureAlgorithm.HS256).compact();
	}

	// ==========================
	// Extract Email
	// ==========================
	public String extractEmail(String token) {

		return extractClaim(token, Claims::getSubject);
	}

	// ==========================
	// Extract Expiration
	// ==========================
	public Date extractExpiration(String token) {

		return extractClaim(token, Claims::getExpiration);
	}

	// ==========================
	// Extract Any Claim
	// ==========================
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

		final Claims claims = extractAllClaims(token);

		return claimsResolver.apply(claims);
	}

	// ==========================
	// Extract Claims
	// ==========================
	private Claims extractAllClaims(String token) {

		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}

	// ==========================
	// Check Expiry
	// ==========================
	private boolean isTokenExpired(String token) {

		return extractExpiration(token).before(new Date());
	}

	// ==========================
	// Validate Token
	// ==========================
	public boolean validateToken(String token, UserDetails userDetails) {

		final String email = extractEmail(token);

		return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

}