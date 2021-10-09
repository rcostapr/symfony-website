<?php

/**
 * User Authentication Controller
 */

namespace App\Db;

use PDO;

/**
 * User Authentication Controller
 */
class Authentication extends Db
{
    /**
     * Parent Constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Reset User Password Method
     * 
     * @param int $userId   ID of the user
     * 
     * @return string       String Hash
     *  
     */
    public function resetPassword(int $userId = 0): string
    {
        // Build the components
        $tokenLeft = base64_encode(random_bytes(15));
        $tokenRight = base64_encode(random_bytes(33));
        $tokenRightHashed = hash('sha256', $tokenRight);
        $startDate = time();
        $datetime = date('Y-m-d H:i:s', strtotime('+30 day', $startDate));

        // DELETE OLD TOKENS
        $stmt = $this->db->prepare("DELETE FROM email_tokens WHERE clientid = ?");
        $stmt->execute([$userId]);

        // Insert into the database
        $stmt = $this->db->prepare(
            "INSERT INTO email_tokens (clientid, selector, hash, expires) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([$userId, $tokenLeft, $tokenRightHashed, $datetime]);
        return $tokenLeft . ':' . $tokenRight;
    }

    /**
     * Recovery User Password
     * 
     * @param string $emailtoken    String Token used
     * 
     * @return boolean              True if token was deleted False otherwise
     */
    public function recoveryPassword(String $emailtoken): int
    {
        // Input validation
        if (strpos($emailtoken, ':') === false) {
            throw new \Exception('Invalid email token');
        }
        list($tokenLeft, $tokenRight) = explode(':', $emailtoken);

        if (strlen($tokenLeft) !== 20 || strlen($tokenRight) !== 44) {
            throw new \Exception('Invalid email token format');
        }

        $tokenRightHashed = hash('sha256', $tokenRight);

        // Fetch from database
        $stmt = $this->db->prepare("SELECT * FROM email_tokens WHERE selector = ?");
        $stmt->execute([$tokenLeft]);
        // Now our token data is stored in $row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (is_null($row['hash'])) {
            throw new \Exception('Invalid email selector');
        }

        // Verify the right hand side, hashed, matches the stored value:
        if (!hash_equals($row['hash'], $tokenRightHashed)) {
            throw new \Exception('Invalid authentication token');
        }

        return $row['clientid'];
    }

    /**
     * Delete Token from Database
     * 
     * @param string $emailtoken    Token used
     * 
     * @return boolean              True if token was deleted False otherwise
     */
    public function deleteToken(String $emailtoken): bool
    {
        // Input validation
        if (strpos($emailtoken, ':') === false) {
            throw new \Exception('Invalid email token');
        }
        list($tokenLeft, $tokenRight) = explode(':', $emailtoken);

        if (strlen($tokenLeft) !== 20 || strlen($tokenRight) !== 44) {
            throw new \Exception('Invalid email token format');
        }
        // Delete token after being retrieved
        $stmt = $this->db->prepare("DELETE FROM email_tokens WHERE selector = ?");
        return $stmt->execute([$tokenLeft]);
    }
}
